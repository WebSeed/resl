var resl = require('./index');

resl({
  manifest: {
    json1: {
      type: 'text',
      src: 'http://mysafeinfo.com/api/data?list=englishmonarchs&format=json'
    },
    // image1: {
    //   type: 'image',
    //   src: 'http://universal-render.s3-website-us-east-1.amazonaws.com/example/images/my-texture.jpg'
    // },
    // image2: {
    //   type: 'image',
    //   src: 'http://universal-render.s3-website-us-east-1.amazonaws.com/example/images/env/pos-x.jpg'
    // },
    // image3: {
    //   type: 'image',
    //   src: 'http://universal-render.s3-website-us-east-1.amazonaws.com/example/images/env/pos-y.jpg'
    // }
  },
  onDone: (assets) => {

    console.log('json1', assets.json1);

    // console.log(assets.image1)
    // document.body.appendChild(assets.image1)
    //
    // console.log(assets.image2)
    // document.body.appendChild(assets.image2)
    //
    // console.log(assets.image3)
    // document.body.appendChild(assets.image3)
  },

  // As assets are preloaded the progress callback gets fired
  onProgress: (progress, message) => {
    document.body.innerHTML +=
      '<b>' + (progress * 100) + '% loaded</b>: ' + message
  },

  onError: (err) => {
    console.error(err)
  }
});
