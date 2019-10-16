<template>
	<div class="pagewrapper">
    <div class="help-center">
        <div class="min-width">
            <div class="sidebar fl">
                <ul>
                    <li>
                    	<router-link :to="{name:'newHelp'}" active-class="active">
                    		<span class="item fs16 fc1b1">新手帮助</span>
                    	</router-link>
                    </li>

                    <!--<li>-->
                      <!--<span class="item fs16 fc1b1">常见问题</span>-->
                    <!--</li>-->
                    <li>
                        <router-link :to="{name:'authentication'}" active-class="active">
                            <span class="item fs16 fc1b1">企业注册</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'platform'}" active-class="active">
                            <span class="item fs16 fc1b1">平台功能</span>
                        </router-link>
                    </li>
                    <li>
                       	<router-link :to="{name:'service'}" active-class="active">
                            <span class="item fs16 fc1b1">服务流程</span>
                        </router-link>
                    </li>
                    <!--<li>-->
                        <!--<router-link :to="{name:'mechanism'}" active-class="active">-->
                            <!--<span class="item fs16 fc1b1">服务机构</span>-->
                        <!--</router-link>-->
                    <!--</li>-->
                </ul>
            </div>
            <router-view></router-view>
        </div>
    </div>
</div>
</template>
