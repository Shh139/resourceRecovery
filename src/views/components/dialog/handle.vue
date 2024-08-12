<!-- 积分兑换 -->
<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

// 声明 props 类型
export interface FormProps {
  formInline: {
    classname: string;
    quantity: string;
    consumptionPoints: string;
    puttime: string;
    exchangecount: string;
    status: number;
  };
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    classname: "",
    quantity: "",
    consumptionPoints: "",
    puttime: "",
    exchangecount: "",
    status: 1
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
      <el-col :span="3" class="label">{{ t("form.productName") }}</el-col>
      <el-col :span="20">
        <el-input
          v-model="newFormInline.classname"
          class="!w-[220px]"
          disabled
          :placeholder="t('form.productName')"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{
        t("form.conversionQuantity")
      }}</el-col>
      <el-col :span="20">
        <el-input
          v-model="newFormInline.quantity"
          class="!w-[220px]"
          disabled
          :placeholder="t('form.conversionQuantity')"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.consumptionPoints") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.consumptionPoints"
          class="!w-[220px]"
          disabled
          :placeholder="t('form.consumptionPoints')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.submissionDate") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.puttime"
          class="!w-[220px]"
          disabled
          :placeholder="t('form.submissionDate')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("table.pointExchange7") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.exchangecount"
          class="!w-[220px]"
          disabled
          :placeholder="t('table.pointExchange7')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.orderStatus") }}</el-col>
      <el-col :span="20">
        <el-select v-model="newFormInline.status" style="width: 90%">
          <el-option :label="t('form.orderStatus1')" :value="1" />
          <el-option :label="t('form.orderStatus2')" :value="2" />
          <el-option :label="t('form.orderStatus3')" :value="3" /> </el-select
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
