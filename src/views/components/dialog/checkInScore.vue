<!-- 签到积分管理 -->
<script setup lang="ts">
import { ref, defineProps } from "vue";
import siteForm from "@/components/siteForm/index.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

// 声明 props 类型
export interface FormProps {
  formInline: {
    regionName: string;
    creationTime: string;
    updateTime: string;
    checkInScore: string;
    status: number;
  };
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    regionName: "",
    creationTime: "",
    updateTime: "",
    checkInScore: "",
    status: 0
  })
});

// vue 规定所有的 prop 都遵循着单向绑定原则，直接修改 prop 时，Vue 会抛出警告。此处的写法仅仅是为了消除警告。
// 因为对一个 reactive 对象执行 ref，返回 Ref 对象的 value 值仍为传入的 reactive 对象，
// 即 newFormInline === props.formInline 为 true，所以此处代码的实际效果，仍是直接修改 props.formInline。
// 但该写法仅适用于 props.formInline 是一个对象类型的情况，原始类型需抛出事件
// 推荐阅读：https://cn.vuejs.org/guide/components/props.html#one-way-data-flow
const newFormInline = ref(props.formInline);
const newData = newFormInline.value;
</script>

<template>
  <el-form :model="newFormInline">
    <el-row>
      <el-col :span="3" class="label">{{ t("form.checkInScore1") }}</el-col>
      <el-col :span="20">
        <el-input
          v-model="newFormInline.regionName"
          class="!w-[220px]"
          disabled
          :placeholder="t('form.checkInScore1')"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.checkInScore2") }}</el-col>
      <el-col :span="20">
        <el-input
          v-model="newFormInline.creationTime"
          class="!w-[220px]"
          disabled
          :placeholder="t('form.checkInScore2')"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.checkInScore3") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.updateTime"
          class="!w-[220px]"
          disabled
          :placeholder="t('form.checkInScore3')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.checkInScore") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.checkInScore"
          class="!w-[220px]"
          disabled
          :placeholder="t('form.checkInScore')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.checkInScore4") }}</el-col>
      <el-col :span="20">
        <el-select v-model="newFormInline.status" style="width: 90%">
          <el-option :label="t('form.checkInScore4-ni')" :value="0" />
          <el-option
            :label="t('form.checkInScore4-i')"
            :value="1"
          /> </el-select
      ></el-col>
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
