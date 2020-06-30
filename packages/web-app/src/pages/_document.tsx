import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class EnhancedDocument extends Document {
  static async getInitialProps({
    renderPage,
  }: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()

    const page = renderPage({
      enhanceApp: (App: any) => {
        return (props): React.ReactElement => {
          return sheet.collectStyles(<App {...props} />)
        }
      },
    })
    const styles = sheet.getStyleElement()
    return { ...page, styles }
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          {this.props.styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default EnhancedDocument
