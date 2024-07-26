<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

// 声明 props 类型
export interface FormProps {
  formInline: {
    tel: string;
    yfCardNo: string;
    yfCardNoSec: string;
    jfCardNo: string;
    jfCardNoSec: string;
    qtCardNo: string;
    qtCardNoSec: string;
    pwd: string;
    rePwd: string;
    company: string;
    fullname: string;
    sex: string;
    uCode: string;
    dangId: string;
    ifresident: string;
    iscleaner: string;
    build: string;
    unit: string;
    address: string;
    userType: string;
    cadre: string;
    cadreTel: string;
    party: string;
    partyTel: string;
    officeName: string;
    officeUserName: string;
    officeType: string;
    population: string;
    imgpath: string;
    areaInfo: string;
  };
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    tel: "",
    yfCardNo: "",
    yfCardNoSec: "",
    jfCardNo: "",
    jfCardNoSec: "",
    qtCardNo: "",
    qtCardNoSec: "",
    pwd: "",
    rePwd: "",
    company: "",
    fullname: "",
    sex: "",
    uCode: "",
    dangId: "",
    ifresident: "",
    iscleaner: "",
    build: "",
    unit: "",
    address: "",
    userType: "",
    cadre: "",
    cadreTel: "",
    party: "",
    partyTel: "",
    officeName: "",
    officeUserName: "",
    officeType: "",
    population: "",
    imgpath: "",
    areaInfo: ""
  })
});

// vue 规定所有的 prop 都遵循着单向绑定原则，直接修改 prop 时，Vue 会抛出警告。此处的写法仅仅是为了消除警告。
// 因为对一个 reactive 对象执行 ref，返回 Ref 对象的 value 值仍为传入的 reactive 对象，
// 即 newFormInline === props.formInline 为 true，所以此处代码的实际效果，仍是直接修改 props.formInline。
// 但该写法仅适用于 props.formInline 是一个对象类型的情况，原始类型需抛出事件
// 推荐阅读：https://cn.vuejs.org/guide/components/props.html#one-way-data-flow
const newFormInline = ref(props.formInline);
</script>

<template>
  <el-form :model="newFormInline">
    <el-row>
      <el-col :span="3" class="label">{{ t("form.contactPerson") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.fullname"
          class="!w-[220px]"
          placeholder=""
          disabled
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.tel") }}</el-col>
      <el-col :span="20">
        <el-input
          v-model="newFormInline.tel"
          class="!w-[220px]"
          placeholder=""
          disabled
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.sex") }}</el-col>
      <el-col :span="20">
        <el-select v-model="newFormInline.sex" style="width: 90%" disabled>
          <el-option :label="t('form.sex1')" value="男" />
          <el-option :label="t('form.sex2')" value="女" /> </el-select
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">身份证</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.uCode"
          class="!w-[220px]"
          placeholder=""
          disabled
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">厨余卡号</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.yfCardNo"
          class="!w-[220px]"
          placeholder=""
          disabled
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">积分卡号</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.jfCardNo"
          class="!w-[220px]"
          placeholder=""
          disabled
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">其它卡号</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.qtCardNo"
          class="!w-[220px]"
          placeholder=""
          disabled
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">地区</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.areaInfo"
          class="!w-[220px]"
          placeholder=""
          disabled
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">详细地址</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.address"
          class="!w-[220px]"
          placeholder=""
          disabled
      /></el-col>
    </el-row>
  </el-form>
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
