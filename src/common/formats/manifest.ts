import * as d from 'io-ts/Decoder';
import { pipe } from 'fp-ts/function';
import { isRight } from 'fp-ts/lib/Either';

const manifestDecoder = pipe(
    d.struct({
        entrypoints: d.record(
            d.struct({
                assets: d.struct({
                    js: d.array(d.string),
                }),
            }),
        ),
    }),
);

type Manifest = d.TypeOf<typeof manifestDecoder>;

export const parseManifest = (obj: unknown): Manifest => {
    const res = manifestDecoder.decode(obj);
    if (isRight(res)) {
        return res.right;
    }

    throw new Error(d.draw(res.left));
};
