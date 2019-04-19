## 修改方法
1. 原后端是api接口,基本都在service.js, 原则上把这部分代码替换掉即可
2. 一般都是在 model.js里调用原后端api,所以直接在这里替换比较省力
3. 以product为例:
   原:
    const { status, data } = yield call(homeApi.product,
   替换为
    const products_list = yield call(findMany, {collection:'product', condition:'', fields: ["id","cover_image","limit_tag","brand_name","name","market_price","type_id","mode_id","enabled"]});
    
4. 原理: 只要在effect里满足state所需的数据即可, dispatch这些都不用修改
   如果我们数据库的字段名有变动,需要修改UI里的代码,例如我们是 brand_name ,而原文是brand
