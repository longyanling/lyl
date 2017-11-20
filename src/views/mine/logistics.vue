<template>
    <div id="order-logistics" class="tm-order-logistics">
        <div class="nav">
            <ins></ins>
            <div class="left common" @click="tabShow(0)" :class=" [ tabIndex == 0 ? 'actived' : '' ] ">
                <em class="title">商家发货物流 </em>
                <var class="line"></var>
            </div>
            <div class="right common" @click="tabShow(1)" :class=" [ tabIndex == 1 ? 'actived' : '' ] ">
                <em class="title">寄回玩具物流</em>
                <var class="line"></var>
            </div>
        </div>
        <div class="leftMain" v-show="tabIndex == 0">
            <div class="list">
                <div class="item" v-for="(item, index) in expressMail" v-touch:tap="{event: tabExpressMail , params : [ index ]}">
                    <em class="name">{{item.company}}</em>
                    <var class="number">{{item.code}}</var>
                </div>
            </div>
            <div class="details" v-for="(item, index) in expressMail" v-show="index == expressMailIndex">
                <div class="detail" v-for="seed in item.detail" >
                    <div class="time">
                        <var class="timemin">12:34</var>
                        <var class="month">09-22</var>
                    </div>
                    <div class="top"></div>
                    <div class="max"></div>
                    <div class="min"></div>
                    <div class="stage">
                        <div class="content">
                            <span class="title">{{seed.description}}</span>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <div class="rightMain" v-show="tabIndex == 1">
            <div class="list">
                <div class="item" v-for="(item , index) in expressReturn" v-touch:tap="{event: tabExpressReturn , params : [ index ]}">
                    <em class="name">{{item.company}}</em>
                    <var class="number">{{item.code}}</var>
                </div>
            </div>
            <div class="details" v-for="(item, index) in expressReturn" v-show="index == expressReturnIndex">
                <div class="detail" v-for="seed in item.detail" >
                    <div class="time">
                        <var class="timemin">23:22</var>
                        <var class="month">09-22</var>
                    </div>
                    <div class="top"></div>
                    <div class="max"></div>
                    <div class="min"></div>
                    <div class="stage">
                        <div class="content">
                            <span class="title">{{seed.description}}</span>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="addReturn" v-touch:tap="{event:cellHref,params:['/mine/order/return']}">添加寄回快递信息</div>
        </div>
    </div>
</template>




<script>
    import Logistics from '@/views/mine/logistics.js'
    import '@/views/mine/logistics.scss'
    
    export default Logistics;
</script>