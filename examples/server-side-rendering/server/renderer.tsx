const debug = require('debug')('renderer');
import React from 'react';
import path from 'path';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet } from 'styled-components';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
const statsFile = path.resolve(__dirname, '../build/loadable-stats.json');
import Routes from '../src/client/routes';

import { getFooter, getHeader } from './html-template';

const renderer = (req, res) => {
  const nonce = ''
  const routerContext: any = {};
  const extractor = new ChunkExtractor({ statsFile });
  const sheet = new ServerStyleSheet();
  const frontend = sheet.collectStyles(
    <ChunkExtractorManager extractor={extractor}>
      <StaticRouter location={req.url} context={routerContext}>
        <Routes />
      </StaticRouter>
    </ChunkExtractorManager>
  );
  res.status(200);

  res.setHeader('Cache-Control', 's-maxage=0');

  res.write(
    getHeader({
      nonce,
    })
  );

  const stream = sheet.interleaveWithNodeStream(renderToNodeStream(frontend));

  stream.pipe(
    res,
    { end: false }
  );

  stream.on('end', () =>
    res.end(
      getFooter({
        extractor,
        nonce,
      })
    )
  )
};

export default renderer;
