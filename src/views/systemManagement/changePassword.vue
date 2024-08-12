<!-- 省市管理 -->
<template>
  <el-form size="default">
    <el-card shadow="never">
      <el-row>
        <el-col>
          <el-form-item :label="t('form.originalPassword')">
            <el-input
              v-model="oldPwd"
              style="width: 100%"
              :placeholder="t('form.originalPassword')"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item :label="t('form.newPassword')">
            <el-input
              v-model="newPwd"
              style="width: 100%"
              :placeholder="t('form.newPassword')"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item :label="t('form.confirmPassword')">
            <el-input
              v-model="rePassword"
              style="width: 100%"
              :placeholder="t('form.confirmPassword')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="getData">{{
            t("buttons.pureConfirm")
          }}</el-button>
        </el-col>
      </el-row>
    </el-card>
  </el-form>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, createVNode } from "vue";
import { useI18n } from "vue-i18n";
import { ElButton } from "element-plus";
import { editPwd } from "@/api/systemManagement";
import { message } from "@/utils/message";
const { t } = useI18n();

const dataTab = ref([]);

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "ChangePassword"
});

var oldPwd = ref("");
var newPwd = ref("");
var rePassword = ref("");

onMounted(() => {
  nextTick(() => {
    getData();
  });
});

function getData() {
  let data = {
    oldPwd: oldPwd.value,
    newPwd: newPwd.value,
    rePassword: rePassword.value
  };
  editPwd(data).then(res => {
    if (res.status === 10001000) {
      message(t("message.successfulOperation"), { type: "success" });
    } else {
      message(res.msg, { type: "error" });
    }
  });
}
</script>

<style lang="scss" scoped>
.el-col {
  margin-right: 10px;
}
::v-deep .el-form-item__label {
  color: #000 !important;
  font-weight: 300 !important;
}
::v-deep .el-row {
  width: 100%;
}
::v-deep .el-dialog__body {
  height: 500px !important;
  overflow: auto;
}
</style>
