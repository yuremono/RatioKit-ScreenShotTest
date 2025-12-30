
$(function () {// img タグに lazy
        const images = document.querySelectorAll('#contents img');
        images.forEach(img => {
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc) {
                img.src = dataSrc; // data-srcがあればsrcに設定
            }
            img.setAttribute('loading', 'lazy');
        });
    });
    $(function () {// 重要：使わないラップ要素を除外、
        $(".dis,.disnone,.dnone").remove();
    });
    $(function () {// 重要：要素の改変処理、figure画像、画像テキストと.itemの構造統一


    });
    $(function () {// スライダー
        try {
            let slideRate = 5000;
            let slideFade = 600;
            /* !slick ------------------------------------------------------------ */
            $('.mv_slide').slick({
                fade: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 600,
                autoplaySpeed: `${slideRate}`,
                autoplay: false,
            });
            // $(".mv_slide ,.op_slide ul,.mv_switch,.bg_slide ul").slick({
            // $(".mv_slide ,.op_slide ul,.mv_switch,.bg_slide ul").slick({
            //     autoplay: true,
            //     fade: true,
            //     slidesToShow: 1,
            //     arrows: false,
            //     dots: false,
            //     // adaptiveHeight: true,
    
            //     autoplaySpeed: `${slideRate}`,
            //     speed: `${slideFade}`,
            //     cssEase: "ease-in-out",
            //     // vertical: true,
            //     infinite: true,
            //     useCSS: true,
            //     pauseOnFocus: false, //スライダーをフォーカスした時にスライドを停止させるか
            //     pauseOnHover: false, //スライダーにマウスホバーした時にスライドを停止させるか
            //     // responsive: [
            //     //     { breakpoint: 960, settings: { slidesToShow: 1 } }
            //     // ]
            // });
            // $('.mv_switch').each(function (i) { $(this).attr('style', `--rate:${slideRate + slideFade}ms`); });//スライド時間をcss変数に
            // $(".mv_slide .slick-arrow,.mv_slide .slick-dots").wrapAll('<div class="arrows">');アローとドットをまとめる
    
            $(".sns_slide .sns_list, .ul_slide ul, .card_slide, .blog_slide .blog_list").each(function () {
                const $slider = $(this);
                const isReverse = $slider.hasClass("__rev");
                const isLinear = $slider.hasClass("__linear"); //等速、ライナー、マーキー
                const isVer2 = $slider.hasClass("__ver2"); //等速、ライナー、マーキー
    
                let options = {// 基本設定
                    autoplay: true,
                    autoplaySpeed: 5400,
                    speed: 600,
                    cssEase: "ease-out",
                    slidesToShow: 4,
                    arrows: false,
                    dots: true,
                    useCSS: true,
                    pauseOnHover: true,
                    rtl: isReverse,
                    responsive: [
                        // { breakpoint: 1441, settings: { slidesToShow: 4 } },
                        { breakpoint: 961, settings: { slidesToShow: 3 } },
                        { breakpoint: 835, settings: { slidesToShow: 2 } }
                    ]
                };
                if (isVer2) {
                    $.extend(options, {
                        slidesToShow: 3,
                    });
                }
                if (isLinear) {
                    $.extend(options, {
                        autoplaySpeed: 0,
                        speed: 12000,
                        cssEase: "linear",
                        dots: false,
    
                    });
                }
                if (isReverse) {
                    $slider.attr("dir", "rtl");
                }
                $slider.slick(options);
            });
            // $(".card_slide .item").addClass('js-bottom');//フェイドインクラス追加
    
            $('.thumb_slide ul').slick({//ドットをサムネイルに置き換えるスライダー
                dots: true,
                // autoplay: true,
                arrows: false,
                // fade: true,
                autoplaySpeed: 4000,
                speed: 500,
                slidesToShow: 1,
                adaptiveHeight: true,
                customPaging: function (slick, index) {
                    // スライダーのインデックス番号に対応した画像のsrcを取得
                    var targetImage = slick.$slides.eq(index).find('img').attr('src');
                    // slick-dots > li　の中に上記で取得した画像を設定
                    return '<img src=" ' + targetImage + ' "/>';
                }
            });
        } catch (error) { console.log(error); }
    });
    $(function () {//パンくず.pan1 ポリシーサイト名.website_name
        const POLICY_TEXT = document.querySelector('.f_copy > span')?.textContent || '';
        const websiteNames = document.querySelectorAll('.website_name');
        if (websiteNames.length && POLICY_TEXT) {
            websiteNames.forEach(el => {
                el.textContent = POLICY_TEXT;  // テキストのみ
                // el.innerHTML = POLICY_TEXT; // HTMLごと入れる
            });
        }
        const HOME_TEXT = (document.querySelector('.f_copy>span')?.textContent || '') + "　ホーム";// トップページのリンクテキストを設定
        const H1 = document.querySelector('.page-title h1  ');// h1を指定している要素を取得
        // const H1 = document.querySelector('.title1 h1 span:first-of-type ');// h1を指定している要素を取得
        const CURRENT_PAGE_URL = location.href;// 現在のurlを取得
        const HOME_PAGE_URL = `https://${location.host}`;// トップページのurlを取得
        const PAN = document.querySelector('pan');// パンくずを表示させる要素を取得
        // const HOME_TEXT = document.querySelector('.f_copy>span ').textContent;// トップページのリンクテキストを設定
        if (H1 && PAN) {
            const H1_TEXT = H1.textContent || '';// 現在のh1テキストからリンクテキストを設定
            const BREADCRUMB_HTML = `
            <ul itemscope="itemscope" itemtype="https://schema.org/BreadcrumbList">
                <li itemprop="itemListElement" itemscope="itemscope" itemtype="https://schema.org/ListItem">
                    <meta itemprop="position" content="1">
                    <a itemprop="item" itemscope="itemscope" itemtype="http://schema.org/Thing" href="${HOME_PAGE_URL}" itemid="${HOME_PAGE_URL}">
                        <meta itemprop="name" content="${HOME_TEXT}">
                        ${HOME_TEXT}
                    </a>
                </li>
                <li aria-hidden="true" class="breadcrumb-separator">›</li>
                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <meta itemprop="position" content="2">
                    <span itemprop="name">${H1_TEXT}</span>
                </li>
            </ul>
            `
            PAN.insertAdjacentHTML('afterbegin', BREADCRUMB_HTML);
        }
    });
    
    $(function () {// その他クラス処理
        $('.budoux').wrapInner('<budoux-ja>');//autoPhrase(文節改行)
        $('.blog_list a').attr('target', '_self');
        $(".policy-trigger,.policy-wrap").on("click", function () {//ポリシー
            $(".policy-wrap").toggleClass("active");
        });
        $('p.annot').insertAfter('.form_wrap.entry');
        $('div.submit').insertAfter('.annot');
        try {
            $('.fancybox li,.fancybox .item').each(function (i) {// fancyboxは共通クラス CDN magnificPopup
                alt = $(this).find('img').attr('alt');
                src = $(this).find('img').wrap('<a>').attr('src');
                $(this).find('a').attr('href', `${src}`);
                $(this).find('a').attr('title', `${alt}`);
            });
            $('.fancybox').magnificPopup({//ポップアップ
                delegate: 'a',
                type: 'image',
                removalDelay: 600,
                gallery: {
                    enabled: true
                },
                preloader: true,
            });
        } catch (error) { console.log(error); }
        try {//horizontal scroll ＆scroll-hintはCDN「 横スクロール＞できます」表示 
            new ScrollHint('.__scrollX, .tbl_scroll', {
                i18n: {
                    scrollable: 'スクロールできます'
                }
            });
            let scrollElement = document.querySelectorAll(".__scrollX, .tbl_scroll");
            scrollElement.forEach((el) => {// スクロールヒントとは別処理、マウス上下スクロールを横スクロールに
                el.addEventListener("wheel", (e) => {
                    if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
                    let maxScrollLeft = el.scrollWidth - el.clientWidth;
                    if (
                        (el.scrollLeft <= 0 && e.deltaY < 0) ||
                        (el.scrollLeft >= maxScrollLeft && e.deltaY > 0)
                    )
                        return;
                    e.preventDefault();
                    el.scrollLeft += e.deltaY;
                });
            });
        } catch (error) { console.log(error); }
        try {// Jquery slideToggle FAQ Q&A よくある質問
        //     $(".form_qa.firstOpen dl:first-child dt").addClass('show');
        //     $(".form_qa dl dt").click(function () {
        //         $(this).next("dd").stop().slideToggle();
        //         $(this).toggleClass('show');
        //     });
        //     $(".fb_qa.firstOpen .item:first-child ").addClass('show').next(".item").stop().slideToggle();
        //     $(".fb_qa.allOpen .item").addClass('show').next(".item").stop().slideToggle();
        //     $(".fb_qa .item:nth-child(odd)").click(function () {
        //         $(this).next(".item").stop().slideToggle();
        //         $(this).toggleClass('show');
        //     });
        } catch (error) { console.log(error); }
        try {// 空altに{#copy} 
            COPY = $('.f_copy>span').text();
            $('img').each(function () {// add alt
                if ($(this).is('[alt=""]')) {
                    $(this).attr('alt', `${COPY}`);
                }
                // $(this).on("error", function () {
                //     console.log("画像が指定されていません");
                //     $(this).attr("src", "/images/home/logo.png");
                // });
                // $(this).attr({//画像保存対策
                //     oncontextmenu: 'return false',
                //     draggable: 'false',
                // });
            });
            // $('.blog_list>div').each(function () {//ブログ画像ない時ロゴを入れる
            //     photo = $(this).find('.blog_photo')
            //     if (!photo.find('>a').length) {
            //         console.log('gazou')
            //         href = $(this).find('.blog_text h3>a').attr('href')
            //         newel = $('<a target="_self"><img src="/images/home/logo.png" alt=""></a>').appendTo(photo);
            //         photo.find('a').attr('href', `${href}`);
            //     } else { }
            // });
        } catch (error) { console.log(error); }
    
        // *********************固有処理
    
        $('.li-label>br').remove();
        $('.card3.__service .item').each(function () {
            const $img = $(this).find('img');
            const src = $img.attr('src');
            if (src) {
                $(this).css('--bg', `url(/${src})`);
            }
        });
    
        $(".p-hashSplit p").each(function () {// #でspan分離
            let tx = $(this).text();
            if (tx.indexOf("#") >= 0) {
                let array = $(this).html().split('#');
                // console.log(array);
                $(this).html(array[0] + '<span>' + array[1] + '</span>')
                // $(this).html('<span>' + array[0] + '</span>' + array[1])
                // $(this).html('<dt>' + array[0] + '</dt><dd>' + array[1] + '</dd>')
            }
        });
        $('.wrapInner :is(h1,h2,h3,.h1FZ,.h2FZ,.h3FZ)').wrapInner('<span>');
        $('imgToMask>*').each(function (i) {
            src = $(this).find('img').attr('src');
            $(this).find('figure').attr('style', `mask-image:url(/${src})`);
        });
        // $('.addProp').each(function (i) { //add custom prop
        //     let num = $(this).find('>*').length;
        //     $(this).attr('style', `--r:${num};`)
        // });
    
        // $('.div-split div>*').html(function () {//全て囲む
        //     return $(this).html().replace(/\n/g, '').split("").filter(function (x) {
        //         return x.match(/\S/);
        //     }).map(function (x) {
        //         return "<span>" + x + "</span>";
        //     }).join("");
        // });
        // $('.brSplit-li').html(function () {//全て囲む
        //     return $(this).html().replace(/\n/g, '').split("<br>").filter(function (x) {
        //         return x.match(/\S/);
        //     }).map(function (x) {
        //         return "<li>" + x + "</li>";
        //     }).join("");
        // });
    });
    $(function () {// バイリンガル
        const switch_btn = '<div class="switch"><input id="cmn-toggle-1" class="cmn-toggle cmn-toggle-round" type="checkbox"><label for="cmn-toggle-1"><span></spsn></label></div>';
        $("#builingual").prepend(switch_btn);
        const windowSize = window.innerWidth;
        if (windowSize > 768) {
        } else {
            $("#builingual").prependTo("#global_header");
        }
        $("span.translate").next().hide();
        $("div.translate").hide();
        $(".switch").on("click", function () {
            if ($("#cmn-toggle-1").prop('checked')) {
                console.log("チェックされています。");
                $("span.translate").next().show();
                $("span.translate").hide();
                $("div.translate").show();
                $("div.translate").prev().hide();
            } else {
                console.log("チェックされていません。");
                $("span.translate").next().hide();
                $("span.translate").show();
                $("div.translate").hide();
                $("div.translate").prev().show();
            }
        });
    });
    
    $(function () {//navigation ヘッダーナビゲーション sp用ナビはh_navを複製
        try {
            $(".h_nav ul li a").each(function () {// #でh_nav aをspan分離
                let tx = $(this).text();
                if (tx.indexOf("#") >= 0) {
                    let array = $(this).html().split('#');
                    // console.log(array);
                    $(this).html(array[0] + '<span>' + array[1] + '</span>')
                    // $(this).html('<span>' + array[0] + '</span>' + array[1])
                    // $(this).html('<dt>' + array[0] + '</dt><dd>' + array[1] + '</dd>')
                }
            });
            // sp用($menu以下)のナビゲーション
            $(".h_nav").clone().attr("id", "navsp").removeClass("h_nav").addClass("nav").wrapInner('<div class="nav_inner">').insertAfter('.h_nav');
    
            MENU = document.querySelector(".h_menu");
            navpc = document.querySelector(".h_nav");
            HnavA = document.querySelectorAll(".h_nav a");
            cont = document.querySelector("#contents");
            navsp = document.querySelector("#navsp");
            navul = document.querySelector("#navsp ul");
            menutoggle = document.querySelectorAll(".menu_toggle, .nav a:not(.nopointer,.drop_toggle)");
            contact = document.querySelectorAll(".h_items a");
            Dtoggle = document.querySelectorAll(".drop_toggle");
            Ghdr = document.querySelector("#global_header");
            hdr = document.querySelector('#header');
            focustrap = document.querySelector('.focus_trap');
    
            const btnPress = () => {//メニューボタン押した時の変化
                navpc.inert = navpc.inert === true ? false : true;
                navsp.classList.toggle("show");
                navul.classList.toggle("show");
                MENU.ariaPressed = MENU.ariaPressed === "true" ? "false" : "true";
                MENU.ariaExpanded = MENU.ariaExpanded === "true" ? "false" : "true";
                MENU.ariaLabel =
                    MENU.ariaLabel === "menu open" ?
                        "menu close" :
                        "menu open";
                hdr.classList.toggle("active");
                MENU.classList.toggle("active");
            };
            // btnPress();
    
            HnavA.forEach((el) => {
                el.addEventListener("click", () => {
                    setTimeout(() => {
                        el.blur();
                    }, 600);
                });
            });
            contact.forEach((el) => {
                el.addEventListener("click", () => {
                    if (hdr.classList.contains("active")) {
                        btnPress();
                    }
                });
            });
            menutoggle.forEach((el) => {
                el.addEventListener("click", () => {
                    btnPress();
                });
            });
            focustrap.addEventListener("focus", () => {
                MENU.focus();
            });
            window.onkeyup = function (event) {
                if (event.keyCode == '27' && MENU.ariaPressed === "true") {
                    btnPress();
                }
            }
            // window.addEventListener("keydown", () => {
            //     if (MENU.ariaPressed === "true") {
            //         if (event.key === "Escape") {
            //             btnPress();
            //         }
            //     }
            // });
            // アコーディオン開閉 
            const dropDown = (el) => {// spナビのトグル
                parent = el.closest('li');
                target = el.closest('li').querySelector('ul');
                target.classList.toggle("show");
                el.classList.toggle("active");
                parent.ariaExpanded = parent.ariaExpanded === "true" ? "false" : "true";
                target.ariaHidden = target.ariaHidden === "false" ? "true" : "false";
                target.ariaLabel = target.ariaLabel === "open" ? "close" : "open";
            }
            Dtoggle.forEach((el) => {// spナビのトグル実行
                el.addEventListener("click", () => {
                    dropDown(el);
                });
            });
        } catch (error) { console.log(error); }
    });
    $(function () {// IntersectionObserver ヘッダー変形 .trans or .init
        const head = document.querySelectorAll(//対象、この要素が画面に出入りすることを監視
            ".mv,.first,.title1,.page-title"
        );
        const observerH = new IntersectionObserver(IOhead, { rootMargin: "0% 0% -0% 0px", threshold: 0.5 });
        function IOhead(entries) {
            entries.forEach(function (entry, i) {//スクロール時trans(変形) or 上端でinit(初期化)
                const header = document.querySelector('#header');
                if (entry.isIntersecting) {
                    header.classList.remove('trans');
                    // header.classList.add('init');
                }
                else {
                    header.classList.add('trans');
                    // header.classList.remove('init'); 
                }
            });
        }
        head.forEach((tgt) => { observerH.observe(tgt); });
    });
    $(function () {// IntersectionObserver その他 .show
        const Once = document.querySelectorAll( // 一度のみ
            "[class*=js-]:not([class*=js-ch],.js-bgFix),[class*=js-ch]>*"
        );
        const observerO = new IntersectionObserver(IOonce, {
            rootMargin: "0% 0% -15% 0px",
            threshold: 0,
            // root: document.body,
        });
        function IOonce(entries) {
            entries.forEach(function (entry, i) {
                const target = entry.target;
                if (entry.isIntersecting) {
                    target.classList.add("show");
                }
            });
        }
        Once.forEach((tgt) => { observerO.observe(tgt); });
    
        const Toggle = document.querySelectorAll(// トグル、フェードインアウト
            ".f_main,.js-bgFix"
        );
        const observerT = new IntersectionObserver(IOtoggle, { rootMargin: "-0% 0% -50% 0px", });
        function IOtoggle(entries) {
            entries.forEach(function (entry, i) {
                const target = entry.target;
                if (entry.isIntersecting) { target.classList.add("show"); }
                else { target.classList.remove("show"); }
            });
        }
        Toggle.forEach((tgt) => { observerT.observe(tgt); });
    
        const slide = document.querySelectorAll("[class*=_slide]");// スライド画面外停止 !!! autoplay:false が無効
        const observerS = new IntersectionObserver(IOslide, { rootMargin: "-0% 0% -0% 0px", threshold: 0.5 });
        function IOslide(entries) {
            entries.forEach(function (entry, i) {
                const targetID = entry.target.id;
                const target = $(`#${targetID}`);
                if (entry.isIntersecting) {
                    try {
                        target.find('ul,>div').slick('slickPlay');
                    } catch (e) { }
                }
                else {
                    try {
                        target.find('ul,>div').slick('slickPause');
                    } catch (e) { }
                }
            });
        }
        // slide.forEach((tgt) => { observerS.observe(tgt); });
    });
    
    $(function () {// ページ毎処理 ページ設定でクラス付与できるが自動処理やshopにページタイトルつける時など
        // let pageT = location.pathname.slice(1).replace(".html", "");
        // let param = location.search;
        // let html = $('html');
        // if (pageT == "" || pageT.includes("index") || param.includes("page=776&token")) {
        //     html.addClass("home");
        //     if ($("li>a[href*='index.html']")) {
        //         $("li>a[href*='index.html']").each(function (i) {
        //             ANC = $(this).attr('href').replace('index.html', '');
        //             // ANC = $(this).attr('href');
        //             // console.log(ANC); 
        //             $(this).attr('href', `${ANC}`)
        //         });
        //     }
        // }
        // else {
        //     $('.h').addClass('trans');
        //     if (pageT.includes("blog")) {
        //         html.addClass("blog");
        //         $(".h_nav ul li a").each(function () {// #でh_nav aをspan分離
        //             let tx = $(this).text();
        //             if (tx.indexOf("#") >= 0) {
        //                 let array = $(this).html().split('#');
        //                 $(this).html(array[0] + '<span>' + array[1] + '</span>')
        //             }
        //         });
        //     }
        //     else
        //     if (pageT.includes("shop")) {
        // html.addClass("shop");
        // let newel = $('<div class="title1" style="margin-top:unset;"><article  class="title1_inner" style="text-align:center;"><h1 class=""><span class="">オンラインショップ</span><small>Online Shop</small></h1></article></div>').appendTo($('#global_header'));
        // let newel = $('<div class="title1" style="background-image: url(/images/home/title1.jpg);"><article  class="title1_inner" style="text-align:left;"><h1 class=" " style=""><em style="color:#fff">Shopping</em><span class="">お買い物</span></h1></article></div>').appendTo($('#global_header'));
        // $('section>div.crumb>ul').insertAfter('.item_view>h2');
        //     }
        // }
    });
    
    
    
    // $(function () {//文字分割 一文字ずつspanで囲む
    //     class SpanWrap {//spanwrap
    //         constructor(target) {
    //             this.target = this.convertElement(target);
    //             this.nodes = [...this.target.childNodes];
    //             this.convert();
    //         }
    //         convert() {
    //             let spanWrapText = ""
    //             this.nodes.forEach((node) => {
    //                 if (node.nodeType == 3) {//テキストの場合
    //                     const text = node.textContent.replace(/\r?\n/g, '');//テキストから改行コード削除
    //                     // const text = node.textContent;//テキストから改行コード削除
    //                     //spanで囲んで連結
    //                     spanWrapText = spanWrapText + text.split('').reduce((acc, v, i) => {
    //                         return acc + `<span>${v}</span>`
    //                         // return acc + `<span style ="--num:${i};">${v}</span>`
    //                     }, "");
    //                 }
    //                 else {//<br>などテキスト以外の要素をそのまま連結
    //                     spanWrapText = spanWrapText + node.outerHTML
    //                 }
    //             })
    //             this.target.innerHTML = spanWrapText.replace(/\n/, '');
    //         }
    //         //jQueryオブジェクトや文字列セレクターを変換
    //         convertElement(element) {
    //             if (element instanceof HTMLElement) { return element }
    //             if (element instanceof jQuery) { return element[0] }
    //             return document.querySelector(element);
    //         }
    //     }
    //     // span分離実行
    //     const targets = [...document.querySelectorAll(".js-letter :is(h1,h2,h3)")]
    //     targets.forEach((target) => {
    //         new SpanWrap(target);
    
    //         // document.querySelector('');
    //         // linum = target.querySelectorAll('li').length;
    //         // target.setAttribute('style', `--li:${linum}`);
    //     })
    // });
    // $(window).on('load', function () {//scrollbar幅取得
    //     const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    //     const setProp = document.querySelectorAll('.mv,.title1');
    //     if (setProp.length) {
    //         setProp.forEach((el) => {
    //             el.style.setProperty('--scrollBar', `${scrollbarWidth}px`);
    //         });
    //     }
    // });
    // $(function () {//title1を#contents前に
    //     try {
    //         $('.sectionWood .title1').prependTo('#contents');
    //     } catch (error) { console.log(error); }
    // });
    
    
    // $(function () {//webstorage loadローディング   header初期非表示
    //     try {
    //         $('header').addClass('hide');
    //         $(".op-close").on("click", function () {
    //             $('.op').attr('style', "transition-duration: 0.6s;");
    //             $('.op').addClass('closed');
    //             $('header').removeClass('hide');
    //             $(".op_slide ul").slick('slickPause');
    //         });
    //         const webStorage = function () {
    //             if (sessionStorage.getItem('visit')) {//2回目以降の処理
    //                 $('.op').addClass('closed');
    //                 $('header').removeClass('hide');
    //                 $(".op_slide ul").slick('slickPause');
    //                 // document.querySelector('.op').setAttribute("style", "display:none;");
    //             } else {//初回訪問時の処理
    //                 sessionStorage.setItem('visit', 'true'); //sessionStorageにデータ格納
    //             }
    //         };
    //         webStorage();
    //     } catch (error) { console.log(error); }
    // });
    
    // $(function () {//動画処理
    //     const mvVideos = document.querySelectorAll('.mv_video');
    //     const observer = new IntersectionObserver((entries) => {
    //         entries.forEach(entry => {
    //             const container = entry.target;
    
    //             // <video>タグ処理
    //             const video = container.querySelector('video');
    //             if (video && typeof video.play === 'function' && typeof video.pause === 'function') {
    //                 if (entry.isIntersecting) {
    //                     video.play().catch(() => { }); // 自動再生制限対策
    //                 } else {
    //                     video.pause();
    //                     console.log("00");
    //                 }
    //             }
    //             // YouTube <iframe>タグ処理
    //             const iframe = container.querySelector('iframe');
    //             if (iframe && iframe.src.includes('youtube.com')) {
    //                 const command = entry.isIntersecting ? 'playVideo' : 'pauseVideo';
    //                 iframe.contentWindow.postMessage(
    //                     JSON.stringify({
    //                         event: 'command',
    //                         func: command,
    //                         args: ''
    //                     }),
    //                     '*'
    //                 );
    //             }
    //         });
    //     }, {
    //         threshold: 0.1 // 少しでも画面に入ったら再生
    //     });
    //     // 監視スタート
    //     mvVideos.forEach(el => {
    //         observer.observe(el);
    //     });
    // });
    $(function () { // MV動画 lazy再生処理
        const mvVideos = document.querySelectorAll('.mv_video');
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const container = entry.target;
                const video = container.querySelector('video');
    
                // 交差したら src をセットして再生
                if (entry.isIntersecting) {
                    if (video && !video.src && video.dataset.src) {
                        video.src = video.dataset.src;
                    }
                    if (video && typeof video.play === 'function') {
                        video.play().catch(() => { /* 自動再生ブロック対策 */ });
                    }
                } else {
                    if (video && typeof video.pause === 'function') {
                        video.pause();
                    }
                }
    
                // YouTube iframe対応（既存ロジック維持）
                const iframe = container.querySelector('iframe');
                if (iframe && iframe.src.includes('youtube.com')) {
                    const command = entry.isIntersecting ? 'playVideo' : 'pauseVideo';
                    iframe.contentWindow.postMessage(
                        JSON.stringify({
                            event: 'command',
                            func: command,
                            args: ''
                        }),
                        '*'
                    );
                }
            });
        }, { threshold: 0.1 });
    
        mvVideos.forEach(el => observer.observe(el));
    });