/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/server/api/admin.js
 * @Date         : 2022-02-14 11:10:51
 * @LastEditTime : 2022-11-14 13:09:25
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
export default {
  get_login_jsons: '/login', // 登录接口
  query_user_jsons: '/users', // 用户信息 -- post方法 //注册  --put方法 //修改  --get方法 //查询所有用户
  query_user_manger_jsons: '/users', // 用户 -- post方法 //新增  --put方法 //修改 --get方法 //查询所有角色

  query_roles_jsons: '/roles', // 角色管理 -- post方法 //新增  --put方法 //修改 --get方法 //查询所有角色
  query_roles_all_jsons: '/roles/all', // 不分页查询所有角色 --get方法

  query_permissions_jsons: '/permissions', // 权限管理  -- post方法 //新增  --get方法 //查询所有权限
  query_permissions_all_jsons: '/permissions/all', //权限管理不分页查询所有权限 get方法

  query_menu_jsons: '/menus', // 菜单信息

  query_ratePlan_jsons: '/RatePlan', // 利率计划 -- post方法 //新增  --put方法 //修改  --get方法 //查询所有计划
  query_ratePlan_all_jsons: '/RatePlan/all', //利率计划不分页查询所有利率计划  --get
  query_interestRate_jsons: '/InterestRate', // 利率 -- post方法 //新增  --put方法 //修改  --get方法 //查询所有利率 --delete方法 //删除

  query_documentTemplateDirectory_jsons: '/DocumentTemplateDirectory', // 文档模版目录 -- post方法 //新增  --put方法 //修改  --get方法 //查询 --delete方法 //删除
  query_documentTemplate_jsons: '/DocumentTemplate', // 文档模版目录 -- post方法 //新增  --put方法 //修改  --delete方法 //删除
  query_downloadTemplate_jsons: '/DocumentTemplate/download', // 下载文档 get

  query_loanProduct_jsons: '/LoanProduct', //贷款产品 post方法 //新增、加ID修改   get方法 //查询、加ID查看详情   '/all'//不分页查询所有所有贷款产品 get方法

  query_loanUploadConfigure_jsons: '/LoanUploadConfigure', // 申请贷款上传文件 post方法 //新增  get方法 //查询所有计划  -delete方法 //删除

  query_riskControlRule_jsons: '/RiskControlRule', //风控规则 post方法新增,  PUT方法修改 /{id},  DELETE方法删除 /{id}

  query_person_jsons: '/Person', //个人信息 get方法 --查询列表   --post方法 //新增  --PUT方法 //修改  /{id} get方法 --查询详情

  query_customerOffer_jsons: '/CustomerOffer', //贷款 get方法 --查询列表   --PUT方法 //修改  /{id} get方法 --查询详情

  query_underwritingManagement_jsons: '/UnderwritingManagement', //承销管理 get方法 --查询列表   --PUT方法 //修改  /{id} get方法 --查询详情

  query_loanAgreement_jsons: '/LoanAgreement', // get方法 //查询   --put方法 收工更改为支付状态

  revise_underwritingManagement_jsons: '/UnderwritingManagement', //修改承销状态 put方法  /approval/{id}  //通过, /rejected/{id}  //拒绝
  revise_loanAgreement_jsons: '/LoanAgreement', //修改贷款协议状态 put方法  signed/{id}  //签署 , /paid/{id}  //支付

  query_consumerLoan_invoice_detail_jsons: '/ConsumerLoan/invoice', //查询待处理账单列表  // get方法 //查询
  query_consumerLoan_invoice_jsons: '/ConsumerLoan/repayment/instruction', //查询待处理账单列表  // get方法 //查询

  query_loan_business: '/LoanBusiness', // 放款查询 --get 查询
  query_loan_business_fee: '/LoanBusiness/fee', // 查询费用信息 --get 查询
  query_loan_business_disbursement: '/LoanBusiness/disbursement', // 查询放款信息 --get 查询
  query_loan_business_history: '/LoanBusiness/history/event', // 查询历史信息 --get 查询
  query_loanApplicationStatistics_jsons: '/loanApplicationStatistics', // 贷款申请统计
  query_loanApplicationStatistics_charts_jsons: '/loanApplicationStatistics/charts', // 贷款申请统计

  query_commissionStatistics_jsons: '/commissionStatistics', // 佣金统计 get
  query_commissionStatistics_charts_jsons: '/commissionStatistics/charts', // 佣金统计charts get

  query_questionnaire_json: '/questionnaire', // 问卷调查 put方法  修改问卷  post方法  新增问卷  get方法  分页查询问卷
  query_product_json: '/product', // 产品 put方法 修改  post方法  新增  get方法  分页查询

  query_loan_json: '/loan', // 贷款 put方法 修改  post方法  新增  get方法  分页查询

  query_organisation_jsons: '/Organisation', //企业信息 get方法 --查询列表   --post方法 //新增  --PUT方法 //修改  /{id} get方法 --查询详情

  query_channel_jsons: '/channel', //查询渠道列表 get   新增渠道 post
  query_channel_statistics_pie_jsons: '/channelStatistics/pie', //查询渠道列表 get   新增渠道 post

  query_position_jsons: '/position', //查询岗位列表 get   新增岗位 post 修改岗位put

  query_pdpa_jsons: '/pdpa', //--post新增, --get查询列表,  /{id} --get查询详情,   /{id} --put修改
  query_pdpa_authority_jsons: '/pdpa/authority', // --get 查询权限  --put 更新权限

  query_definition_process_jsons: '/definition/process', // --get查询流程定义列表,  --post添加流程定义   --put 修改

  query_definition_activity_jsons: '/definition/activity', // --get查询活动定义列表,  --post添加活动定义   --put 修改

  query_definition_event_jsons: '/definition/event', // --get查询事件定义列表,  --post添加事件定义   --put 修改

  query_step_process_jsons: '/step/process', // 流程查询  -- get

  query_step_activity_jsons: '/step/activity', // 活动/事件 查询  -- get

  query_step_event_jsons: '/step/event', // 活动/事件 查询  -- get

  query_event_handle_jsons: '/event/handle', // 事件处理 get方法，查询事件操作列表

  query_users_position_jsons: '/users/position', // 根据岗位查用户 get方法，查询事件操作列表

  query_templateData_channel_jsons: '/templateData/channel', // 添加channel模板

  query_templateData_ratePlan_jsons: '/templateData/ratePlan', // 添加利率计划模板

  query_templateData_loanProduct_jsons: '/templateData/loanProduct', // 添加产品模板

  query_templateData_pdpa_jsons: '/templateData/pdpa', // 添加pdpa模板

  query_templateData_questionnaire_jsons: '/templateData/questionnaire', // 添加问卷模板

  query_templateData_permission_jsons: '/templateData/permission', // 添加权限模板

  query_templateData_role_jsons: '/templateData/role', // 添加角色模板

  query_templateData_user_jsons: '/templateData/user', // 添加用户模板

  query_templateData_position_jsons: '/templateData/position', // 添加岗位模板

  test_jsons: '/DocumentTemplate/test'
}
