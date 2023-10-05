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
