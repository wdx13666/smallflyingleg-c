var TableTree = function (tableId,url,cloums) {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $(tableId).bootstrapTable({
            url: url,
            idField: 'id',
            dataType:'json',
            columns: cloums,

            // bootstrap-table-treegrid.js 插件配置 -- start

            //在哪一列展开树形
            treeShowField: 'resName',
            //指定父id列
            parentIdField: 'parentId',

            onResetView: function(data) {
                //console.log('load');
                $(tableId).treegrid({
                    initialState: 'collapsed',// 所有节点都折叠
                    // initialState: 'expanded',// 所有节点都展开，默认展开
                    treeColumn: 1,
                    // expanderExpandedClass: 'glyphicon glyphicon-minus',  //图标样式
                    // expanderCollapsedClass: 'glyphicon glyphicon-plus',
                    onChange: function() {
                        $(tableId).bootstrapTable('resetWidth');
                    }
                });

                //只展开树形的第一级节点
                $(tableId).treegrid('getRootNodes').treegrid('expand');

            },
            onCheck:function(row){
                var datas = $(tableId).bootstrapTable('getData');
                // 勾选子类
                selectChilds(datas,row,"id","pid",true);

                // 勾选父类
                selectParentChecked(datas,row,"id","pid")

                // 刷新数据
                $(tableId).bootstrapTable('load', datas);
            },

            onUncheck:function(row){
                var datas = $table.bootstrapTable('getData');
                selectChilds(datas,row,"id","pid",false);
                $(tableId).bootstrapTable('load', datas);
            },
            // bootstrap-table-treetreegrid.js 插件配置 -- end
        });
    };

    return oTableInit;
};

// 格式化按钮
function operateFormatter(value, row, index) {
    return [
        '<button type="button" class="RoleOfadd btn-small  btn-primary" style="margin-right:15px;"><i class="fa fa-plus" ></i>&nbsp;新增</button>',
        '<button type="button" class="RoleOfedit btn-small   btn-primary" style="margin-right:15px;"><i class="fa fa-pencil-square-o" ></i>&nbsp;修改</button>',
        '<button type="button" class="RoleOfdelete btn-small   btn-primary" style="margin-right:15px;"><i class="fa fa-trash-o" ></i>&nbsp;删除</button>'
    ].join('');

}
// 格式化类型
function typeFormatter(value, row, index) {
    if (value === 'menu') {  return '菜单';  }
    if (value === 'button') {  return '按钮'; }
    if (value === 'api') {  return '接口'; }
    return '-';
}
// 格式化状态
function statusFormatter(value, row, index) {
    if (value === 1) {
        return '<span class="label label-success">正常</span>';
    } else {
        return '<span class="label label-default">锁定</span>';
    }
}

//初始化操作按钮的方法
window.operateEvents = {
    'click .RoleOfadd': function (e, value, row, index) {
        add(row.id);
    },
    'click .RoleOfdelete': function (e, value, row, index) {
        del(row.id);
    },
    'click .RoleOfedit': function (e, value, row, index) {
        update(row);
    }
};