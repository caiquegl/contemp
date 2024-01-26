import Document, {
  Html,
  Main,
  NextScript,
  Head,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }


  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.png" />
          <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=14306fef-6e0e-4947-a1b2-f2c444c9ac12"> </script>

          <script async src="https://www.googletagmanager.com/gtag/js?id=G-7RE6JLX9LC" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7RE6JLX9LC');
            `,
            }}
          />

          <script dangerouslySetInnerHTML={{
            __html: ` charset="UTF-8"
            src="//web.webpushs.com/js/push/3f93a7e26b3243a7cacc6bfb64a62082_1.js"
            async`,
          }} />

          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-1047791211"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-1047791211');
              `,
            }}>
          </script>

          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-WHR7H8W');
                `,
            }}
          >
          </script>

          <script src="https://cdn.croct.io/js/v1/lib/plug.js?appId=1431ba0f-c00a-49e0-868a-22b0f8b45c29"></script>
          <script>croct.plug();</script>

          <link rel="preconnect" href="https://dev.visualwebsiteoptimizer.com" />

          <script type='text/javascript' id='vwoCode'
            dangerouslySetInnerHTML={{
              __html: `
            window._vwo_code=window._vwo_code || (function() {
            var account_id=698764,
            version = 1.5,
            settings_tolerance=2000,
            library_tolerance=2500,
            use_existing_jquery=false,
            is_spa=1,
            hide_element='body',
            hide_element_style = 'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important',
            /* DO NOT EDIT BELOW THIS LINE */
            f=false,w=window,d=document,vwoCodeEl=d.querySelector('#vwoCode'),code={use_existing_jquery:function(){return use_existing_jquery},library_tolerance:function(){return library_tolerance},hide_element_style:function(){return'{'+hide_element_style+'}'},finish:function(){if(!f){f = true;var e=d.getElementById('_vis_opt_path_hides');if(e)e.parentNode.removeChild(e)}},finished:function(){return f},load:function(e){var t=d.createElement('script');t.fetchPriority='high';t.src=e;t.type='text/javascript';t.onerror=function(){_vwo_code.finish()};d.getElementsByTagName('head')[0].appendChild(t)},getVersion:function(){return version},getMatchedCookies:function(e){var t=[];if(document.cookie){t = document.cookie.match(e) || []}return t},getCombinationCookie:function(){var e=code.getMatchedCookies(/(?:^|;)\s?(_vis_opt_exp_\d+_combi=[^;$]*)/gi);e=e.map(function(e){try{var t=decodeURIComponent(e);if(!/_vis_opt_exp_\d+_combi=(?:\d+,?)+\s*$/.test(t)){return''}return t}catch(e){return''}});var i=[];e.forEach(function(e){var t=e.match(/([\d,]+)/g);t&&i.push(t.join('-'))});return i.join('|')},init:function(){if(d.URL.indexOf('__vwo_disable__')>-1)return;w.settings_timer=setTimeout(function(){_vwo_code.finish()},settings_tolerance);var e=d.currentScript,t=d.createElement('style'),i=e&&!e.async?hide_element?hide_element+'{'+hide_element_style+'}':'':code.lA=1,n=d.getElementsByTagName('head')[0];t.setAttribute('id','_vis_opt_path_hides');vwoCodeEl&&t.setAttribute('nonce',vwoCodeEl.nonce);t.setAttribute('type','text/css');if(t.styleSheet)t.styleSheet.cssText=i;else t.appendChild(d.createTextNode(i));n.appendChild(t);var o=this.getCombinationCookie();this.load('https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&f='+ +is_spa+'&vn='+version+(o?'&c='+o:''));return settings_timer}};w._vwo_settings_timer = code.init();return code;}());
            `,
            }}>
          </script>

        </Head>
        <body>
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WHR7H8W"
              height="0" width="0">
            </iframe>
          </noscript>
          <Main />
          <NextScript />
          <script
            type="text/javascript"
            async
            src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/e038acad-48ed-4f16-8e46-7c675b617c92-loader.js"
          ></script>

          <script
            dangerouslySetInnerHTML={{
              __html: `
              !function (t, e, c, n) {
                var s = e.createElement(c);
                s.async = 1, s.src = 'https://scripts.claspo.io/scripts/' + n + '.js';
                var r = e.scripts[0];
                r.parentNode.insertBefore(s, r);
                var f = function () {
                    f.c(arguments);
                };
                f.q = [];
                f.c = function () {
                    f.q.push(arguments);
                };
                t['claspo'] = t['claspo'] || f;
              }(window, document, 'script', 'D2A6126274A54444A114BABFD55E0B7D');

              
              claspo('init');
            `,
            }}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
              type="text/javascript">
              script = document.createElement('script')
              script.src = 'https://static.wdgtsrc.com/assets/loader.js';
              script.async = true;
              script.setAttribute("data-chats-widget-id",'1805cf20-1f1f-4176-8763-205893047c07');
              document.head.appendChild(script);
              `,
            }}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
            async
            src="https://static.wdgtsrc.com/assets/loader.js"
            data-chats-widget-id="1805cf20-1f1f-4176-8763-205893047c07"
            `,
            }}
          />

          {/*<script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-24615402-1"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-24615402-1');
          `,
            }}
          />*/}
        </body>
      </Html>
    );
  }
}
