<template>
  <div class="app-container">
    <div class="top-search">
      <div class="top-l">
        <el-form :inline="true" :model="searchCarGroupForm">
          <el-form-item label="车型名称:" class="mr20">
            <el-input
              v-model.trim="searchCarGroupForm.searchName"
              placeholder=""
              clearable
              filterable
              size="mini"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="top-r">
        <el-button type="primary" size="mini" @click="showDialogSaicVisible(1)">
          添加
        </el-button>
        <el-button type="primary" size="mini">导入</el-button>
        <el-button type="primary" size="mini">导出</el-button>
      </div>
    </div>

    <div class="wf-content">
      <el-table :data="saicCouponData" tooltip-effect="dark" border stripe>
        <el-table-column label="券名" prop="name"></el-table-column>
        <el-table-column label="券码" prop="couponCode"></el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <div>
              {{ scope.row.saicType | filterSaicType }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发券方" prop="company"></el-table-column>
        <el-table-column
          label="现金价"
          prop="money"
          width="90"
        ></el-table-column>
        <el-table-column
          label="积分价"
          prop="pointCost"
          width="90"
        ></el-table-column>
        <el-table-column
          label="发布时间"
          prop="createTime"
          width="180"
        ></el-table-column>
        <el-table-column
          label="操作人"
          prop="username"
          width="120"
        ></el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="showDialogSaicVisible(2, scope.row)"
              >编辑</el-button
            >
            <el-button type="primary" size="mini" @click="delAiImage(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.pageNo"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="searchForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>

    <!-- 添加弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dislogSaicVisible"
      class="uploadavatar"
    >
      <el-form
        :model="saicTemplateForm"
        :rules="saicTemplateFormRules"
        ref="saicTemplateFormRef"
        label-width="160px"
      >
        <el-form-item label="类型：">
          <el-radio-group v-model="saicTemplateForm.saicType">
            <el-radio label="1">经销商服务类</el-radio>
            <el-radio label="2">出行服务类</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="券名称：" prop="name">
          <el-input v-model="saicTemplateForm.name" class="w200"></el-input>
        </el-form-item>
        <el-form-item label="创建日期：">
          <el-date-picker
            v-model="createTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getTime"
            size="small"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dislogSaicVisible = false">取 消</el-button>
        <el-button
          v-if="isAdd"
          type="primary"
          @click="confirmSaicTemplate('saicTemplateFormRef', 1)"
          >确 定</el-button
        >
        <el-button
          v-else
          type="primary"
          @click="confirmSaicTemplate('saicTemplateFormRef', 2)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getSaicCoupon, addSaicCoupon, editSaicCoupon } from "@/api/coupon";
export default {
  name: "Model",
  data() {
    const validateNumber = (rule, value, callback) => {
      if (value != "" && !/^[0-9]+(.[0-9]{1,2})?$/.test(value)) {
        callback(new Error("请输入最多2位小数的数字"));
      } else {
        callback();
      }
    };
    return {
      searchForm: {
        name: "",
        couponCode: "",
        createTimeMin: "",
        createTimeMax: "",
        page_number: 1,
        page_size: 10,
      },
      saicCouponData: [],
      totalCount: 0,

      dislogSaicVisible: false,
      createTime: "",
      isAdd: true,
      saicTemplateForm: {
        id: "",
        saicType: "1",
        name: "",
        couponCode: "",
        pointCost: "",
        money: "",
        detail: "",
      },
      saicTemplateFormRules: {
        name: [
          { required: true, message: "请输入券名称", trigger: "blur" },
          { min: 2, max: 50, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        saicPic: [{ required: true, message: "请上传图片", trigger: "blur" }],
        couponCode: [
          { required: true, message: "请输入券码", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "长度在 2 到 100 个字符",
            trigger: "blur",
          },
        ],
        pointCost: [
          {
            required: true,
            message: "请输入最多2位小数的数字",
            trigger: "blur",
          },
          {
            validator: validateNumber,
            trigger: "blur",
          },
        ],
        money: [
          {
            required: true,
            message: "请输入最多2位小数的数字",
            trigger: "blur",
          },
          {
            validator: validateNumber,
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["language"]),
    dialogTitle() {
      if (this.isAdd) {
        return "添加上汽券模板";
      } else {
        return "编辑上汽券模板";
      }
    },
  },
  created() {
    this.getSaicCoupon(this.searchForm);
  },
  methods: {
    async getSaicCoupon(searchObj = {}) {
      const res = await getSaicCoupon(this.clearParams(searchObj));
      this.saicCouponData = res.data.dataList;
      this.totalCount = res.data.totalCount;
    },
    showDialogSaicVisible(index, scope) {
      this.dislogSaicVisible = true;
      if (index == 1) {
        // 1 添加
        this.isAdd = true;
        this.saicTemplateForm.saicType = "1";
        this.saicTemplateForm.name = "";
      } else {
        // 2 编辑
        this.isAdd = false;
        this.saicTemplateForm.id = scope.id;
        this.saicTemplateForm.saicType = scope.saicType.toString();
        this.saicTemplateForm.name = scope.name;
      }
    },
    confirmSaicTemplate(formName, index) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (index == 1) {
            // 添加
            const res = await addSaicCoupon(this.saicTemplateForm);
            this.$message({
              type: "success",
              message: "添加成功",
            });
          } else {
            // 编辑
            const res = await editSaicCoupon(this.saicTemplateForm);
            this.$message({
              type: "success",
              message: "编辑成功",
            });
          }
          this.dislogSaicVisible = false;
          this.getSaicCoupon(this.searchForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    delAiImage(scope) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteAiImage(scope.id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getTime() {
      if (this.createTime != null) {
        this.searchFormGood.createTimeMin = new Date(
          this.createTime[0]
        ).getTime();
        this.searchFormGood.createTimeMax =
          new Date(this.createTime[1]).getTime() + 86399000;
      } else {
        this.searchFormGood.createTimeMin = "";
        this.searchFormGood.createTimeMax = "";
      }
    },
    // 分页
    handleSizeChange(val) {
      this.searchForm.page_size = val;
      this.getCouponCategoryFullList(this.searchForm);
    },
    handleCurrentChange(val) {
      this.searchForm.page_number = val;
      this.getCouponCategoryFullList(this.searchForm);
    },
    search() {
      this.searchForm.pageNo = 1;
      this.getSaicCoupon(this.searchForm);
    },
    setLanguage() {
      this.saicTemplateFormRules = {
        name: [
          {
            required: true,
            message: this.$t("brand.placeName"),
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: this.$t("brand.placeCode"),
            trigger: "blur",
          },
        ],
      };
    },
  },
  watch: {
    language() {
      this.setLanguage();
    },
  },
  filters: {
    filterSaicType(v) {
      if (v == 1) {
        return "经销商服务类";
      } else if (v == 2) {
        return "出行服务类";
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
