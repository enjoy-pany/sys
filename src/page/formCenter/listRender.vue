<template>
  <div class="spikeMain">
    <div class="search-header">
      <div class="search-params">
        <el-form ref="searchForm" :inline="true" :model="searchParams" size="mini">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="searchParams.name" placeholder="请输入活动名称"></el-input>
          </el-form-item>
          <el-form-item label="活动ID" prop="id">
            <el-input
              v-model="searchParams.id"
              class="spe_input_num"
              type="number"
              placeholder="请输入活动ID"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="search-btns">
        <el-button
          type="primary"
          plain
          size="small"
          @click="handleResetSearchParams('searchForm')"
        >重置</el-button>
        <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
      </div>
    </div>
    <div class="table-wrapper">
      <el-table
        v-loading="isLoading"
        :data="tableData"
        stripe
        style="width: 100%"
        :header-cell-style="{background:'#f2f2f2'}"
      >
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column prop="id" label="活动ID"></el-table-column>
        <el-table-column prop="name" label="活动名称"></el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
              class="yp-solid-primary"
              plain
              size="micro"
              @click.native.prevent="cloneActivity(scope.row)"
            >复制</el-button>
            <el-button
              v-if="scope.row.timeState!==3"
              :disabled="scope.row.status === 1"
              class="yp-solid-primary"
              plain
              size="micro"
              @click.native.prevent="editActivity(scope.row)"
            >编辑</el-button>
            <el-button
              v-if="scope.row.status === 0"
              class="yp-solid-green"
              plain
              size="micro"
              @click.native.prevent="changeActivityStatus(scope.row)"
            >上线</el-button>
            <el-button
              v-if="scope.row.status === 1"
              class="yp-solid-danger"
              plain
              size="micro"
              @click.native.prevent="changeActivityStatus(scope.row)"
            >下线</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px;"
        :current-page="pagination.pageNo"
        :page-sizes="[10, 20]"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  filters: {
    dateFormat(val) {
      return dateFormat(val / 1000);
    }
  },
  data() {
    return {
      isLoading: false,
      searchParams: {
        id: null,
        name: ""
      },
      tableData: [],
      pagination: {
        total: 0,
        pageNo: 1,
        pageSize: 20
      }
    };
  },
  mounted() {
    // this.getProductList()
  },
  methods: {
    dateFormat(row, column, cellValue, index) {
      return (
        dateFormat(row.beginTime / 1000) +
        " 至 " +
        dateFormat(row.endTime / 1000)
      );
    },
    // 获取活动列表
    async getProductList() {
      this.isLoading = true;
    },
    // 上下线
    changeActivityStatus(item) {
      this.$confirm(
        item.status === 0 ? "是否确认上线?" : "是否确认下线?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        }
      )
        .then(() => {
          this.nowSeleItem = item;
          this.onChangeActivityStatus();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    async onChangeActivityStatus(cover = 0) {},
    // 重置
    handleResetSearchParams(formName) {
      this.$refs[formName].resetFields();
    },
    // 搜索
    handleSearch() {
      this.pagination.pageNo = 1;
      this.getProductList();
    },
    handleCurrentChange(val) {
      this.pagination.pageNo = val;
      this.getProductList();
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.pagination.pageNo = 1;
      this.getProductList();
    },
    cloneActivity(item) {},
    addActivity() {},
    editActivity(item) {}
  }
};
</script>
<style lang="less" scoped>
.table-wrapper {
  background: #ffffff;
  padding: 20px;
}
</style>
<style lang="less">
.search-header {
  background: #ffffff;
  padding: 20px 20px 6px 20px;
  margin-bottom: 10px;
  position: relative;
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 14px;
  }
  .search-btns {
    width: auto;
    height: auto;
    margin: 0 !important;
    position: absolute;
    right: 20px;
    bottom: 20px;
    .el-form-item {
      margin: 0;
    }
  }
  .el-form-item__label {
    font-size: 12px;
    color: #333333;
    width: 80px;
  }
  .el-input--mini .el-input__inner {
    width: 180px;
    color: #4a4a4a;
  }
  #good-category-cascader {
    .el-input--mini .el-input__inner {
      width: 250px;
    }
    .el-cascader__label {
      width: 250px;
    }
    .el-input {
      width: 250px;
    }
  }
}
</style>
