<template>
  <div class="unionMain content-block">
    <sub-title>账号管理</sub-title>
    <div class="unionForm">
      <el-form ref="form" :model="formData" label-width="100px" :inline="true">
        <el-form-item label="公会状态:">
          <el-checkbox-group v-model="formData.status">
            <el-checkbox label="4">待审核</el-checkbox>
            <el-checkbox label="1">已入驻</el-checkbox>
            <el-checkbox label="3">已拒绝</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.name" placeholder="公会名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :disabled="clickLock">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="unionTable">
      <el-table :data="tableData" border v-loading="loading" style="width: 100%">
        <el-table-column
          show-overflow-tooltip
          v-for="item in tableMap"
          :formatter="formatData"
          :key="item.id"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        ></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              :disabled="clickLock"
              v-if="(scope.row.groupStatus==4)"
              @click.native.prevent="checkUnion(scope.row)"
              type="text"
              size="small"
            >审核</el-button>
            <el-button
              :disabled="clickLock"
              v-if="(scope.row.groupStatus==4)"
              @click.native.prevent="detailUnion(scope.row)"
              type="text"
              size="small"
            >查看</el-button>
            <el-button
              :disabled="clickLock"
              v-if="(scope.row.groupStatus==4)"
              @click.native.prevent="editUnion(scope.row)"
              type="text"
              size="small"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination
        background
        :current-page.sync="pagination.currentPage"
        :page-size="pagination.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pagination.total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <el-dialog title="入驻审核" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="seleCon">
        <el-radio v-model="agreeRadio" label="1">同意入驻</el-radio>
        <el-radio v-model="agreeRadio" label="3">拒绝入驻</el-radio>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="agreeEnter" :disabled="clickLock">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { order } from "@/api/api.js";
import subTitle from "@/components/SubTitle.vue"
const tableMap = [
  {
    prop: "groupName",
    label: "公会名称",
    width: ""
  },
  {
    prop: "groupCode",
    label: "组织代码",
    width: ""
  },
  {
    prop: "truename",
    label: "真实姓名",
    width: ""
  },
  {
    prop: "contactPhone",
    label: "手机号",
    width: ""
  },
  {
    prop: "createTime",
    label: "注册时间",
    width: ""
  },
  {
    prop: "groupStatusString",
    label: "公会状态",
    width: ""
  }
];
export default {
  components: {
    subTitle
  },
  data() {
    return {
      formData: {
        name: "",
        status: []
      },
      cloneFormData: {
        name: "",
        status: []
      },
      tableData: [],
      tableMap,
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      nowUnionId: null, //当前审核工会id
      dialogVisible: false,
      agreeRadio: "1",
      loading: false,
      clickLock: true
    };
  },
  methods: {
    getTabelData(formType) {
      this.clickLock = true;
      this.loading = true;
      const param = {
        groupName: this[formType].name,
        groupStatus: this[formType].status,
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      };
      this.$http.post(order.list, param).then(
        res => {
          console.log(res);
          this.clickLock = false;
          this.loading = false;
          this.tableData = res.resultList;
          this.pagination.total = res.count;
        },
        err => {
          this.clickLock = false;
          this.loading = false;
        }
      );
    },
    search() {
      this.pagination.currentPage = 1;
      this.getTabelData("formData");
      this.cloneFormData = JSON.parse(JSON.stringify(this.formData));
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.getTabelData("cloneFormData");
    },
    checkUnion(item) {
      this.nowUnionId = item.id;
      this.dialogVisible = true;
    },
    detailUnion(item) {
      this.$router.push({
        path: "/ordercenter/orderdetail",
        query: { orderId: item.id }
      });
    },
    editUnion(item) {
      this.$router.push({
        path: "/ordercenter/orderedit",
        query: { orderId: item.id }
      });
    },
    agreeEnter() {
      this.clickLock = true;
      const param = {
        id: this.nowUnionId,
        result: this.agreeRadio
      };
      this.$http.post(order.verify, param).then(res => {
        this.clickLock = false;
        this.$message.success("操作成功");
        this.getTabelData("cloneFormData");
        this.handleClose(),
          err => {
            this.clickLock = false;
          };
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    formatData(row, column, current, index) {
      if (row.createTime == current) {
        const date = new Date(current);
        const year = date.getFullYear();
        const month =
          date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : `0${date.getMonth() + 1}`;
        const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
        const h = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
        const m =
          date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
        const s =
          date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
        return `${year}-${month}-${day} ${h}:${m}:${s}`;
      }
      return current;
    }
  },
  created() {
    this.getTabelData("formData");
  }
};
</script>
<style lang="less" scoped>
.unionMain {
  width: 100%;
  .unionForm {
    margin-top: 20px;
  }
  .pageNav {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
}
.seleCon {
  margin-top: 30px;
}
</style>
<style lang="less">
.btnCon {
  text-align: center;
}
</style>
