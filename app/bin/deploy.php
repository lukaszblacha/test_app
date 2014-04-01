<?php

class AppManager {
    protected $appDirectory;
    protected $scriptsDirectory;
    protected $stylesDirectory;

    public function __construct() {
        $this->appDirectory = dirname(__FILE__) . "/../";
        $this->scriptsDirectory = $this->appDirectory . "scripts/";
        $this->sassDirectory = $this->appDirectory . "styles-sass/";
        $this->stylesDirectory = $this->appDirectory . "styles/";
        $this->viewsDirectory = $this->appDirectory . "views/";
        $this->webDirectory = $this->appDirectory . "../web/";
    }
	
    public function deploy() {
        $this->deployScripts();
        $this->deployStyles();
        $this->deployViews();
        $this->gzipAssets();
    }
	
    public function deployScripts() {
        $appParts = array( 'configs'=>'', 'filters'=>'', 'controllers'=>'', 'directives'=>'', 'services'=>'' );

        foreach( $appParts as $name=>$part ) {
            $dir = $this->scriptsDirectory . $name . '/';
            $scripts = $this->loadFileContentsArr( $dir );
            $str = "";
            foreach( $scripts as $fname=>$fcontent ) $str .= "\n// {$name}::{$fname}\n".$fcontent."\n\n";
                $appParts[$name] = $str;
        }
        $str = $appParts['configs'] . $appParts['filters'] . $appParts['directives'] . $appParts['services'] . $appParts['controllers'];
        $appParts=null;
        file_put_contents($this->webDirectory . "assets/js/app.js", $str);
        $str=null;
        $this->minifyJavascriptFile( $this->webDirectory . 'assets/js/app.js' );
    }

    public function deployStyles() {
        $this->compileSASS( $this->sassDirectory, $this->stylesDirectory );
        $styles = $this->loadFileContentsArr( $this->stylesDirectory );
        $str = '';
        foreach( $styles as $fname=>$fcontent ) $str .= "\n/* style::{$fname} */\n".$fcontent."\n\n";
        file_put_contents($this->webDirectory . "assets/css/app.css", $str);
        $this->minifyCssFile( $this->webDirectory . 'assets/css/app.css' );
    }

    public function deployViews() {
        $list = array();
        $destDir = $this->webDirectory . 'assets/views/';
        if(FALSE === ($handle = opendir($this->viewsDirectory)) ) throw new Exception("[ERROR] Could not open directory '{$this->viewsDirectory}'.");
        while( FALSE !== ($item=readdir($handle)) ) {
            if( $item[0] === '.' ) continue;
            if( file_exists($destDir.$item) ) unlink( $destDir.$item );
            copy ($this->viewsDirectory.$item, $destDir.$item);
        }
    }
	
    protected function loadFileContentsArr( $dir ) {
        $list = array();
        if(FALSE === ($handle = opendir($dir)) ) throw new Exception("[ERROR] Could not open directory '{$dir}'.");
        while( FALSE !== ($item=readdir($handle)) ) {
            if( $item[0] === '.' ) continue;
            $list[$item] = file_get_contents( $dir.$item );
        }
        return $list;
    }
	
    protected function minifyJavascriptFile( $filename ) {
        $minFilename = substr( $filename, 0, strlen($filename)-3) . ".min.js";
        exec("uglifyjs -v {$filename} -o {$minFilename}");
    }
	
    protected function minifyCssFile( $filename ) {
        $minFilename = substr( $filename, 0, strlen($filename)-4 ) . ".min.css";
        exec("minify {$filename} {$minFilename}");
    }
	
    protected function compileSASS( $srcDir, $dstDir ) {
        exec('node-sass ' . $srcDir . 'app.scss -o ' . $dstDir . 'app.css');
    }
	
    protected function gzipAssets() {
        exec("gzip -f -r {$this->webDirectory}assets/js");
        exec("gzip -f -r {$this->webDirectory}assets/css");
        exec("gzip -f -r {$this->webDirectory}assets/views");
    }
}

$manager = new AppManager();
$manager->deploy();