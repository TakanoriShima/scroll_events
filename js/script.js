/* global $*/
// https://www.sejuku.net/blog/47309

// 画像情報
let image_width;
let image_height;
let image_ratio;
let center_x;
let center_y;

// 線の長さの初期値
let init_line_length;

$(function(){
    
    // 画像の初期情報を計測
    show_image_info();
    
    // 線の長さの初期値を計測
    init_line_length = $('p').width();

    // aタグをクリックした際のスムーズスクロール
    $('a').on('click', function() {
        
        // 移動先を0px調整する。0を30にすると30px下にずらすことができる。
        const adjust = 0;
        
        // スクロールの速度（ミリ秒）
        const speed = 1000;
        
        // 目的地の値取得: リンク先（href）を取得して、hrefという変数に代入
        const href = $(this).attr("href");
        console.log('href: ' + href);
        
        // 移動先を取得 リンク先(href）のidがある要素を探して、goalに代入
        const goal = $(href);
        
        // 移動先を調整:  行先の位置を offset()で取得して、行先のtop位置をposition_topに代入
        console.log('goal offset_left: ' + goal.offset().left + 'px');
        console.log('goal offset_top: ' + goal.offset().top + 'px');
        
        const position_top = goal.offset().top + adjust;
        
        // スムーススクロール linear（等速） or swing（変速）
        $('body, html').animate({scrollTop: position_top}, speed, 'swing');
        
        return false;
    });
    
    // scroll 量に応じて、画像の中心を起点として画像を拡大
    $(window).scroll(function(){
        
        // scroll量取得
        let scroll_top = $(this).scrollTop();
        console.log('scroll_top: ' + scroll_top + 'px');
        
        // 表示画像のwidthを計算
        let width = image_width + scroll_top;
        
        // 拡大、縮小を行う範囲を規定
        if(image_width < width && width <= image_width * 1.5){
        
            // transformプロパティ利用
            // 拡大率の指定
            $('img').css({'transform': 'scale(' + width / image_width +')'});
            
            // 別の方法
            // $('img').css({'width': width + 'px'});
            // $('img').offset({top: center_y - height / 2, left: center_x - width / 2});
        } 
    });
    
    // scroll 量に応じて、線を伸ばす
    $(window).scroll(function(){
        
        // scroll量取得
        let scroll_top = $(this).scrollTop();
        
        let line_length = init_line_length + scroll_top * 1.5;


        // 拡大、縮小を行う範囲を規定
        if(init_line_length < line_length && line_length <= $('#wrapper').width()){
        
            $('#main_view + p').css({'width': line_length + 'px'});
        } 
    });
});

const show_image_info = () => {
    image_width = $('img').prop('width');
    image_height = $('img').prop('height');
    image_ratio = image_height / image_width;
    console.log('image size: (' + image_width + 'px, ' + image_height + 'px)');
    console.log('image ratio: ' + image_ratio);
    
    center_x = $('img').offset().left + image_width / 2;
    center_y = $('img').offset().top + image_height / 2;
    
    console.log('image center: (' + center_x + 'px, ' + center_y + 'px)');
}