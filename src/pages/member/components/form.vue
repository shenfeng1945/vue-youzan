<template>
  <div class="container " style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value="">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" v-model.trim="name" maxlength="20">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" v-model.trim="tel" maxlength="11">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option v-for="p in addressData.list" :value="p.value" :key="p.value">{{p.label}}</option>
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option v-for="c in cityLists" :value="c.value" :key="c.value">{{c.label}}</option>
            </select>
            <select class="js-county-selector" name="area_code" v-model="districtValue">
              <option value="-1">选择地区</option>
              <option v-for="d in districtLists" :value="d.value" :key="d.value">{{d.label}}</option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input type="text" placeholder="街道门牌信息" name="address_detail" v-model="address" maxlength="100">
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn" @click="add">
      <div class="block-item c-blue center">保存</div>
    </div>
    <div class="block section js-delete block-control-btn"
         :class="{hide:type=='add'}"
         @click="remove">
      <div class="block-item c-red center">删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default"
         :class="{hide:type=='add'}"
         @click="setDefault">
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
    <div :class="{hide:!removeSuccess}" style="position:fixed;top:40%;left:50%;transform:translate(-50%,0%);background:rgba(0,0,0,.6);color:#fff;padding:5px 10px;">删除成功</div>
  </div>
</template>

<script src="./form.js">
  
</script>
<style scoped>
  
</style>
