<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useI18n } from "vue-i18n";
import { Plus } from "@element-plus/icons-vue";
import { message } from "@/utils/message";
import { updateImage, collectionUserYCList } from "@/api/resourceOperation";
const { t } = useI18n();

// 声明 props 类型
export interface FormProps {
  formInline: {
    recyType: number;
    title: string;
    price: number;
    units: string;
    keyWords: string;
    macfiflter: string;
    caijiUserId: number;
    iconImgSrc: string;
    fullname?: string;
  };
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    recyType: 1,
    title: "",
    price: 0,
    units: "分/kg",
    keyWords: "",
    macfiflter: "",
    caijiUserId: 0,
    iconImgSrc: "",
    fullname: ""
  })
});

const newFormInline = ref(props.formInline);
const cjyList = ref([]);

const handleUpload = async eve => {
  const formData = new FormData();
  formData.append("file", eve.file);
  console.log(formData);
  updateImage(formData).then(({ data }) => {
    console.log(data);
    if (data.status === 10001000) {
      newFormInline.value.iconImgSrc = data.data;
      console.log(newFormInline.value.iconImgSrc);
      message(t("status.pureUpdate1"), { type: "success" });
    } else {
      message(t("status.pureUpdate2"), { type: "error" });
    }
  });
};

const getCjy = () => {
  collectionUserYCList({ queryMsg: newFormInline.value.keyWords }).then(res => {
    console.log(res);
    if ((res as { status: number }).status === 10001000) {
      cjyList.value = (res as { data: object[] }).data;
      console.log(newFormInline.value.iconImgSrc);
    }
  });
};
</script>

<template>
  <el-row>
    <el-col>
      <el-form-item :label="t('table.name2')">
        <el-input v-model="newFormInline.title" />
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-form-item :label="t('form.unitPrice')">
        <el-input v-model="newFormInline.price" />
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-form-item :label="t('form.unit2')">
        <el-select v-model="newFormInline.units" style="width: 90%">
          <el-option value="分/kg" :label="t('form.units1')" />
          <el-option value="分/个" :label="t('form.units2')" />
          <el-option value="元/kg" :label="t('form.units3')" />
          <el-option value="分/台" :label="t('form.units4')" />
          <el-option value="元/个" :label="t('form.units5')" />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-form-item :label="t('form.shop')">
        <el-input v-model="newFormInline.fullname" disabled />
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-form-item :label="t('form.image')">
      <img
        v-if="newFormInline.iconImgSrc"
        :src="newFormInline.iconImgSrc"
        style="width: 147px; border-radius: 8px; margin-right: 6px"
      />
      <el-upload
        action="#"
        list-type="picture-card"
        :show-file-list="false"
        :http-request="handleUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
    </el-form-item>
  </el-row>
</template>

<style lang="scss" scoped>
.el-col {
  margin-right: 10px;
}
.label {
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
::v-deep .el-form-item__label {
  color: #000 !important;
  font-weight: 300 !important;
}
::v-deep .el-row {
  width: 100%;
  margin-bottom: 10px;
}
::v-deep .el-input {
  width: 90% !important;
}
::v-deep .el-dialog__body {
  height: 500px !important;
  overflow: auto;
}
</style>
