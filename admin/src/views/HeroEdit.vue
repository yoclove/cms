<template>
  <div class="about">
    <h1>{{this.id?"编辑":"新建"}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="skills">
        <el-tab-pane label="基础信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>

          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top: 0.6rem;"
              :max="10"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top: 0.6rem;" :max="10" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top: 0.6rem;" :max="10" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top: 0.6rem;"
              :max="10"
              show-score
              v-model="model.scores.survive"
            ></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="技能">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
        </el-tab-pane>
		<el-tab-pane label="技能" name="skills">
			<el-button @click="model.skills.push({})">添加技能</el-button>
			<el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>

			  <el-form-item label="图标">
				<el-upload
				class="avatar-uploader"
				:action="$http.defaults.baseURL+'/upload'"
				:show-file-list="false"
				:on-success="res => $set(item, 'icon', res.url)"
				>
				<img v-if="item.icon" :src="item.icon" class="avatar" />
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
              </el-form-item>


				<el-form-item label="描述">
            		<el-input type="textarea" v-model="item.description"></el-input>
          	  	</el-form-item>

				<el-form-item label="删除">
					<el-button type="danger" @click="model.skills.splice(i, 1)"
					
					>删除技能</el-button>
          	  	</el-form-item>

			  </el-col>
			  
			</el-row>
		</el-tab-pane>
      </el-tabs>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>




<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 5rem;
  height: 5rem;
  line-height: 5rem !important;
  text-align: center;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>


<script>
export default {
  props: {
    id: {}
  },
  data: function() {
    return {
      categories: [],
      items: [],
      model: {
        avatar: "",
		skills:[],
        scores: {}
      }
    };
  },
  methods: {
    async save() {
      let model;
      if (this.id) {
        model = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        model = await this.$http.post("rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "success ok"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      // this.model = res.data;
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`); //
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`); //
      this.items = res.data;
    },
    afterUpload(res) {
      this.model.avatar = res.url;
    }
  },
  watch: {
    "$route.params.id": function(id) {
      this.model = {};
    }
  },
  created() {
    this.fetchCategories();
    this.fetchItems();
    this.id && this.fetch();
  }
};
</script>
