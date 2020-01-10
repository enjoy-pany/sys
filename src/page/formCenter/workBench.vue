<template>
  <div class="benchWrap">
    <div class="toolBar">
      <el-form size="small" label-width="70px">
        <draggable
          v-model="formModel"
          :group="{ name: 'form', pull: 'clone', put: false}"
          :clone="cloneDog">
          <el-form-item v-for="(item, index) in formModel" :key="index" :label="item.label">
            <div class="formItem" v-if="item.type === 1">
              <el-input v-model="item.value"></el-input>
            </div>
            <div class="formItem" v-if="item.type === 2">
              <el-select v-model="item.value">
                <el-option
                  v-for="(fItem, fIndex) in item.options"
                  :key="fIndex"
                  :label="fItem.label"
                  :value="fItem.value"
                ></el-option>
              </el-select>
            </div>
            <div class="formItem" v-if="item.type === 3">
              <el-date-picker type="date" v-model="item.value"></el-date-picker>
            </div>
            <div class="formItem" v-if="item.type === 4">
              <el-switch v-model="item.value"></el-switch>
            </div>
            <div class="formItem" v-if="item.type === 5">
              <el-checkbox-group v-model="item.value">
                <el-checkbox
                  v-for="(fItem, fIndex) in item.options"
                  :key="fIndex"
                  :label="fItem.label"
                  :value="fItem.value"
                ></el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="formItem" v-if="item.type === 6">
              <el-radio-group v-model="item.value">
                <el-radio
                  v-for="(fItem, fIndex) in item.options"
                  :key="fIndex"
                  :label="fItem.label"
                  :value="fItem.value"
                ></el-radio>
              </el-radio-group>
            </div>
            <div class="formItem" v-if="item.type === 7">
              <el-input type="textarea" v-model="item.value"></el-input>
            </div>
          </el-form-item>
        </draggable>
      </el-form>
    </div>
    <div class="bench">
      <el-form ref="formData" label-width="120px">
        <div v-if="formData.length<=0" class="blankTip">将表单组件拖到这里</div>
        <draggable v-model="formData" group="form" class="dragWrap">
          <el-form-item v-for="(item, index) in formData" :key="index" :label="item.name">
            <div class="formItem" v-if="item.type === 1">
              <el-input v-model="item.value" :placeholder="item.config.placeholder"></el-input>
            </div>
            <div class="formItem" v-if="item.type === 2">
              <el-select v-model="item.value">
                <el-option
                  v-for="(fItem, fIndex) in item.options"
                  :key="fIndex"
                  :label="fItem.label"
                  :value="fItem.value"
                ></el-option>
              </el-select>
            </div>
            <div class="formItem" v-if="item.type === 3">
              <el-date-picker type="date" v-model="item.value"></el-date-picker>
            </div>
            <div class="formItem" v-if="item.type === 4">
              <el-switch v-model="item.value"></el-switch>
            </div>
            <div class="formItem" v-if="item.type === 5">
              <el-checkbox-group v-model="item.value">
                <el-checkbox
                  v-for="(fItem, fIndex) in item.options"
                  :key="fIndex"
                  :label="fItem.label"
                  :value="fItem.value"
                ></el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="formItem" v-if="item.type === 6">
              <el-radio-group v-model="item.value">
                <el-radio
                  v-for="(fItem, fIndex) in item.options"
                  :key="fIndex"
                  :label="fItem.label"
                  :value="fItem.value"
                ></el-radio>
              </el-radio-group>
            </div>
            <div class="formItem" v-if="item.type === 7">
              <el-input type="textarea" v-model="item.value"></el-input>
            </div>
            <div class="formItemTools">
              <span class="formIcon el-icon-s-tools" @click="editFormConfig(item)"></span>
              <span class="formIcon el-icon-minus"></span>
            </div>
          </el-form-item>
        </draggable>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="eidtDialog">
      <el-dialog title="设置" :visible.sync="dialogFormVisible" width="600px">
        <el-form :model="formConfig" label-width="120px">
          <el-form-item label="字段名称">
            <el-input v-model="formConfig.name"></el-input>
          </el-form-item>
          <el-form-item label="键值">
            <el-input v-model="formConfig.key"></el-input>
          </el-form-item>
          <el-form-item label="默认值">
            <el-input v-model="formConfig.value"></el-input>
          </el-form-item>
          <el-form-item label="options" v-if="formConfig.options.length>0">
            <el-row v-for="(item, index) in formConfig.options" :key="index">
              <el-col :span="10">
                <el-form-item label="label" label-width="60px">
                  <el-input v-model="item.label" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="value" label-width="60px">
                  <el-input v-model="item.value" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="margin-left: 10px">
                <span class="el-icon-circle-plus-outline"></span>
                <span class="el-icon-remove-outline"></span>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="是否必填">
            <el-checkbox v-model="formConfig.verify.isRequire">必填</el-checkbox>
          </el-form-item>
          <el-form-item label="placeholder">
            <el-input v-model="formConfig.config.placeholder"></el-input>
          </el-form-item>
          <el-form-item label="tips">
            <el-input v-model="formConfig.config.tips"></el-input>
          </el-form-item>
          <el-form-item label="校验规则">
            <el-input v-model="formConfig.name"></el-input>
          </el-form-item>
          <el-form-item label="关联">
            <el-input v-model="formConfig.name"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data() {
    return {
      dialogFormVisible: false,
      formModel: [
        {
          type: 1,
          label: "输入框", //label
          key: ""
        },
        {
          type: 2,
          label: "下拉框",
          value: [],
          options: [
            {
              label: "选项一",
              value: 1
            },
            {
              label: "选项二",
              value: 2
            }
          ]
        },
        {
          type: 3,
          label: "时间选择",
          value: ""
        },
        {
          type: 4,
          label: "开关",
          value: false
        },
        {
          type: 5,
          label: "多选",
          value: [],
          options: [
            {
              label: "选项一",
              value: 1
            },
            {
              label: "选项二",
              value: 2
            }
          ]
        },
        {
          type: 6,
          label: "单选",
          value: 1,
          options: [
            {
              label: "选项一",
              value: 1
            },
            {
              label: "选项二",
              value: 2
            }
          ]
        },
        {
          type: 7,
          label: "文本域",
          value: ""
        }
      ],
      formData: [],
      formConfig: {
        type: null,
        name: "",
        key: "",
        value: null,
        options: [],
        // 基础配置
        config: {
          placeholder: "",
          tips: ""
        },
        // 校验
        verify: {
          isRequire: true,
          message: "",
          rules: [
            {
              validator: (rule, value, callback) => {
                console.log(value);
                callback();
              },
              trigger: ""
            }
          ]
        }
      }
    };
  },
  methods: {
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    cloneDog(obj) {
      return {
        type: obj.type,
        name: obj.label, //label
        value: obj.value,
        key: "",
        options: obj.options?this.deepCopy(obj.options):[],
        // 基础配置
        config: {
          placeholder: "",
          tips: ""
        },
        // 校验
        verify: {
          isRequire: true,
          message: "请填写活动名称",
          rules: [
            {
              validator: (rule, value, callback) => {
                console.log(value);
                callback();
              },
              trigger: ""
            }
          ]
        }
      }
    },
    editFormConfig(item) {
      this.dialogFormVisible = true;
      this.formConfig = item;
    },
    onSubmit() {
      console.log("submit!", this.formData);
    }
  }
};
</script>
<style lang="less" scoped>
.benchWrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .toolBar {
    width: 400px;
    height: 100%;
    padding: 10px;
    background-color: #fff;
  }
  .bench {
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: #fff;
    margin-left: 10px;
    .el-form {
      position: relative;
      min-height: 500px;
      .el-form-item {
        & :hover {
          .formItem {
            // background-color: #DCDFE6;
          }
          .formItemTools {
            display: flex;
          }
        }
      }
    }
  }
}
.formItemTools {
  width: 30px;
  height: 20px;
  position: absolute;
  right: 0;
  text-align: right;
  display: none;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  .formIcon {
    cursor: pointer;
  }
}
.dragWrap {
  min-height: 300px;
  margin-bottom: 20px;
}
.blankTip {
  width: 100%;
  height: 300px;
  position: absolute;
  border: 1px #dcdfe6 dashed;
  border-radius: 10px;
  font-size: 22px;
  color: #dcdfe6;
  text-align: center;
  line-height: 300px;
}
</style>