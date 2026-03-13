export function mergeImages(photo, signature) {

  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 400;

  const ctx = canvas.getContext("2d");

  const img1 = new Image();
  const img2 = new Image();

  img1.src = photo;
  img2.src = signature;

  return new Promise(resolve => {

    img1.onload = () => {

      ctx.drawImage(img1, 0, 0, 400, 300);

      img2.onload = () => {

        ctx.drawImage(img2, 0, 300, 400, 100);

        const result = canvas.toDataURL("image/png");

        resolve(result);

      };

    };

  });

}