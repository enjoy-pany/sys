<template>
  <div class="benchWrap">
    <div class="toolBar">
      <el-form size="small" label-width="70px">
        <draggable v-model="formModel" :group="{ name: 'form', pull: 'clone', put: false}">
          <el-form-item v-for="(item, index) in formModel" :key="index" :label="item.label">
            <div class="formItem" v-if="item.type === 1">
              <el-input  v-model="item.value"></el-input>
            </div>
            <div class="formItem" v-if="item.type === 2">
              <el-select v-model="item.value">
                <el-option 
                  v-for="(fItem, fIndex) in item.options" 
                  :key="fIndex" 
                  :label="fItem.label" 
                  :value="fItem.value"></el-option>
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
                  :value="fItem.value"></el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="formItem" v-if="item.type === 6">
              <el-radio-group v-model="item.value">
                <el-radio 
                  v-for="(fItem, fIndex) in item.options" 
                  :key="fIndex" 
                  :label="fItem.label" 
                  :value="fItem.value"></el-radio>
              </el-radio-group>
            </div>
            <div class="formItem" v-if="item.type === 7">
              <el-input type="textarea"  v-model="item.value"></el-input>
            </div>
          </el-form-item>
        </draggable>
      </el-form>
    </div>
    <div class="bench">
      <el-form ref="formData" label-width="80px">
        <div v-if="formData.length<=0" class="blankTip">将表单组件拖到这里</div>
        <draggable v-model="formData" group="form" class="dragWrap">
          <el-form-item v-for="(item, index) in formData" :key="index" :label="item.label">
            <div class="formItem" v-if="item.type === 1">
              <el-input  v-model="item.value"></el-input>
            </div>
            <div class="formItem" v-if="item.type === 2">
              <el-select v-model="item.value">
                <el-option 
                  v-for="(fItem, fIndex) in item.options" 
                  :key="fIndex" 
                  :label="fItem.label" 
                  :value="fItem.value"></el-option>
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
                  :value="fItem.value"></el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="formItem" v-if="item.type === 6">
              <el-radio-group v-model="item.value">
                <el-radio 
                  v-for="(fItem, fIndex) in item.options" 
                  :key="fIndex" 
                  :label="fItem.label" 
                  :value="fItem.value"></el-radio>
              </el-radio-group>
            </div>
            <div class="formItem" v-if="item.type === 7">
              <el-input type="textarea"  v-model="item.value"></el-input>
            </div>
            <div class="formItemTools">
              <span class="formIcon el-icon-s-tools"></span>
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
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  data() {
    return {
      formModel: [
        {
          type: 1,
          label: '输入框',
          value: ''
        },
        {
          type: 2,
          label: '下拉框',
          value: [],
          options: [
            {
              label: '选项一',
              value: 1
            },
            {
              label: '选项二',
              value: 2
            }
          ]
        },
        {
          type: 3,
          label: '时间选择',
          value: ''
        },
        {
          type: 4,
          label: '开关',
          value: false
        },
        {
          type: 5,
          label: '多选',
          value: [],
          options: [
            {
              label: '选项一',
              value: 1
            },
            {
              label: '选项二',
              value: 2
            }
          ]
        },
        {
          type: 6,
          label: '单选',
          value: 1,
          options: [
            {
              label: '选项一',
              value: 1
            },
            {
              label: '选项二',
              value: 2
            }
          ]
        },
        {
          type: 7,
          label: '文本域',
          value: ''
        }
      ],
      formData: []
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!', this.formData);
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
    border: 1px #DCDFE6 dashed;
    border-radius: 10px;
    font-size: 22px;
    color: #DCDFE6;
    text-align: center;
    line-height: 300px;
  }

</style>