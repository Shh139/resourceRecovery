<template>
  <el-card shadow="never">
    <el-row>{{ t("menus.userProfile") }}</el-row>
    <el-divider />
    <el-row>
      <el-col :span="6">
        <el-form-item :label="t('content.templateDownload')">
          <el-upload
            class="upload-demo"
            action="#"
            :http-request="httpRequest"
            multiple
            :limit="3"
          >
            <el-button type="primary" class="button-t">{{
              t("buttons.uploadTemplate")
            }}</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="templateDownload">{{
          t("buttons.downloadTemplate")
        }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="1" style="margin-left: 75px">
        <el-upload
          class="upload-demo"
          action="#"
          :http-request="memberUpload"
          multiple
          :limit="3"
        >
          <el-button type="primary" class="button-t">{{
            t("buttons.uploadFile")
          }}</el-button>
        </el-upload>
      </el-col></el-row
    >
  </el-card>
</template>

<script setup lang="ts">
import { message } from "@/utils/message";
import {
  excelUpdateTemplate,
  downExcelTemplate,
  importUserFace
} from "@/api/user";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "UserProfile"
});
type UploadRequestHandler = (params: {
  file: File;
  name: string;
}) => Promise<void>;
async function httpRequest(val: any) {
  const suffix = val.file.name.split(".").pop();
  const dataList = ["xlsx", "xls"];
  if (!dataList.includes(suffix)) {
    message(t("status.pureUpdate2"), { type: "error" });
    return;
  }
  const formData = new FormData();
  formData.append("file", val.file);

  try {
    const res = await excelUpdateTemplate(formData);
    if ((res as { status: number }).status === 10001000) {
      message(t("status.pureUpdate1"), { type: "success" });
    } else {
      message(t("status.pureUpdate2"), { type: "error" });
    }
  } catch (error) {
    console.error("Error during request:", error);
    // Handle error appropriately
  }
}
// 下载模板
function templateDownload() {
  downExcelTemplate({ type: excelUpdateTemplate }).then(res => {
    console.log(res);
    if ((res as { status: number }).status !== 10001000) {
      message(t("status.pureUpdate2"), { type: "success" });
    } else {
      window.open((res as { data: string }).data);
    }
  });
}
// 上传文件
type UploadRequestHandler2 = (fileInfo: { file: File }) => Promise<void>;
const memberUpload: UploadRequestHandler2 = async ({ file }) => {
  const suffix = file.name.split(".").pop();
  const dataList = ["xlsx", "xls"];
  if (!dataList.includes(suffix)) {
    message(t("message.updateErr"), { type: "error" });
    return;
  }
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await importUserFace(formData);
    if ((res as { status: number }).status === 10001000) {
      message(t("status.pureUpdate1"), { type: "success" });
    } else {
      message(t("status.pureUpdate2"), { type: "error" });
    }
  } catch (error) {
    message(t("status.pureUpdate2"), { type: "error" });
  }
};
</script>
<style lang="scss" scoped>
.el-col {
  margin-right: 20px;
}
::v-deep .el-form-item__label {
  color: #000 !important;
  font-weight: 300 !important;
}
::v-deep .el-row {
  width: 100%;
}
</style>
