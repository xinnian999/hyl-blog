const fs = require("fs");
const path = require("path");
const COS = require("cos-nodejs-sdk-v5");
const fileDisplay = require("./fileDispaly");
const cos = new COS({
  SecretId: "AKIDVoreAPN6f04tRiiSv72g4B2buxiCQN3T",
  SecretKey: "IK5ZmkRr0sUpujHYYHjuoRouRmtkLSN4",
});

const bucket = "hylcdn-1305519392";
const region = "ap-beijing";

// 需要上传的文件夹地址
const filePath = path.resolve("./build");

const uploadFile = (filePath) => {
  cos.putObject(
    {
      Bucket: "hylcdn-1305519392" /* 必须 */,
      Region: "ap-beijing" /* 必须 */,
      Key: `static/${filePath.split("/").pop()}` /* 必须 */,
      StorageClass: "STANDARD",
      Body: fs.createReadStream(filePath), // 上传文件对象
    },
    function (err, data) {
      if (data?.statusCode === 200) {
        console.log(`上传${filePath.split("/").pop()}到cdn成功！`);
      }
    }
  );
};

const deleteOldFile = () => {
  return new Promise((resolve) => {
    cos.getBucket(
      {
        Bucket: bucket /* 填入您自己的存储桶，必须字段 */,
        Region: region /* 存储桶所在地域，例如ap-beijing，必须字段 */,
        Prefix: "static/",
        Marker: "static/",
        MaxKeys: 1000,
      },
      function (listError, listResult) {
        if (listError) return console.log("list error:", listError);
        var objects = listResult.Contents.map(function (item) {
          return { Key: item.Key };
        });
        cos.deleteMultipleObject(
          {
            Bucket: bucket,
            Region: region,
            Objects: objects,
          },
          function (delError, deleteResult) {
            if (delError) {
              console.log(delError);
            }
            if (deleteResult?.statusCode === 200) {
              console.log("清理原static目录成功！");
              resolve();
            }
          }
        );
      }
    );
  });
};

const playUpload = async () => {
  // 先删除原来的static
  await deleteOldFile();
  const fileData = await fileDisplay(filePath);
  fileData.forEach((item) => {
    uploadFile(item);
  });
};
playUpload();
