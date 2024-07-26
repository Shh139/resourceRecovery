<script setup lang="ts">
import { ref, defineProps } from "vue";
import siteForm from "@/components/siteForm/index.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

// 声明 props 类型
export interface FormProps {
  formInline: {
    user: string;
    region: string;
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
  };
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    user: "",
    region: "",
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
    imgpath: ""
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
      <el-col :span="3" class="label">{{ t("form.tel") }}</el-col>
      <el-col :span="20">
        <el-input
          v-model="newFormInline.tel"
          class="!w-[220px]"
          :placeholder="t('form.telMsg')"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.yfCardNo") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.yfCardNo"
          class="!w-[220px]"
          :placeholder="t('form.yfCardNo')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.yfCardNoSec") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.yfCardNoSec"
          class="!w-[220px]"
          :placeholder="t('form.yfCardNoSec')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.jfCardNo") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.jfCardNo"
          class="!w-[220px]"
          :placeholder="t('form.jfCardNo')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.jfCardNoSec") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.jfCardNoSec"
          class="!w-[220px]"
          :placeholder="t('form.jfCardNoSec')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.qtCardNo") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.qtCardNo"
          class="!w-[220px]"
          :placeholder="t('form.qtCardNo')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.qtCardNoSec") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.qtCardNoSec"
          class="!w-[220px]"
          :placeholder="t('form.qtCardNoSec')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.pwd") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.pwd"
          class="!w-[220px]"
          :placeholder="t('form.pwd')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.rePwd") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.rePwd"
          class="!w-[220px]"
          :placeholder="t('form.rePwd')"
      /></el-col>
    </el-row>
    <el-row>
      <siteForm :pattern="false" style="margin-left: 30px" />
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.company") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.company"
          class="!w-[220px]"
          :placeholder="t('form.company')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.contactPerson") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.fullname"
          class="!w-[220px]"
          :placeholder="t('form.contactPerson')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.sex") }}</el-col>
      <el-col :span="20">
        <el-select v-model="newFormInline.sex">
          <el-option :label="t('form.sex1')" value="男" />
          <el-option :label="t('form.sex2')" value="女" /> </el-select
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.uCode") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.uCode"
          class="!w-[220px]"
          :placeholder="t('form.uCode')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.dangType") }}</el-col>
      <el-col :span="20">
        <el-select v-model="newFormInline.dangId">
          <el-option :label="t('form.dangType1')" :value="0" />
          <el-option :label="t('form.dangType2')" :value="1" />
          <el-option :label="t('form.dangType3')" :value="2" />
          <el-option :label="t('form.dangType4')" :value="3" />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.ifresident") }}</el-col>
      <el-col :span="20">
        <el-select v-model="newFormInline.ifresident">
          <el-option :label="t('form.yes')" :value="0" />
          <el-option :label="t('form.no')" :value="1" />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.iscleaner") }}</el-col>
      <el-col :span="20">
        <el-select v-model="newFormInline.iscleaner">
          <el-option :label="t('form.yes')" :value="0" />
          <el-option :label="t('form.no')" :value="1" />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.build") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.build"
          class="!w-[220px]"
          :placeholder="t('form.build')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.unit") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.unit"
          class="!w-[220px]"
          :placeholder="t('form.unit')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.address") }}</el-col>
      <el-col :span="20"
        ><el-input
          v-model="newFormInline.address"
          class="!w-[220px]"
          :placeholder="t('form.address')"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.userType") }}</el-col>
      <el-col :span="20">
        <el-select v-model="newFormInline.userType">
          <el-option :label="t('form.userType1')" :value="1" />
          <el-option :label="t('form.userType2')" :value="2" />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.cadre") }}</el-col>
      <el-col :span="20">
        <el-input
          v-model="newFormInline.cadre"
          class="!w-[220px]"
          :placeholder="t('form.cadre')"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.cadreTel") }}</el-col>
      <el-col :span="20">
        <el-input
          v-model="newFormInline.cadreTel"
          class="!w-[220px]"
          :placeholder="t('form.cadreTel')"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.party") }}</el-col>
      <el-col :span="20">
        <el-input
          v-model="newFormInline.party"
          class="!w-[220px]"
          :placeholder="t('form.party')"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.partyTel") }}</el-col>
      <el-col :span="20">
        <el-input
          v-model="newFormInline.partyTel"
          class="!w-[220px]"
          :placeholder="t('form.partyTel')"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.officeName") }}</el-col>
      <el-col :span="20">
        <el-input
          v-model="newFormInline.officeName"
          class="!w-[220px]"
          :placeholder="t('form.officeName')"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.officeUserName") }}</el-col>
      <el-col :span="20">
        <el-input
          v-model="newFormInline.officeUserName"
          class="!w-[220px]"
          :placeholder="t('form.officeUserName')"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.officeType") }}</el-col>
      <el-col :span="20">
        <el-select v-model="newFormInline.officeType">
          <el-option :label="t('form.officeType1')" :value="1" />
          <el-option :label="t('form.officeType2')" :value="2" />
          <el-option :label="t('form.officeType3')" :value="3" />
          <el-option :label="t('form.officeType4')" :value="4" />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">{{ t("form.population") }}</el-col>
      <el-col :span="20">
        <el-input
          v-model="newFormInline.population"
          class="!w-[220px]"
          :placeholder="t('form.population')"
        />
      </el-col>
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
