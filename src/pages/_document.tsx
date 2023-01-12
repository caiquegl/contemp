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
          <script src="https://www.googleoptimize.com/optimize.js?id=OPT-W2XSF2X"></script>

          <script async src="https://www.googletagmanager.com/gtag/js?id=G-7RE6JLX9LC"/>
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


        </Head>
        <body>
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
