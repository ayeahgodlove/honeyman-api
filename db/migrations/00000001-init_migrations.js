'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Users", deps: []
 * createTable "Categories", deps: []
 * createTable "SubCategories", deps: [Categories]
 * createTable "Orders", deps: [Users]
 * createTable "Products", deps: [Categories, SubCategories]
 * createTable "ProductOrders", deps: [Products, Orders]
 * createTable "Payments", deps: [Users]
 *
 **/

const info = {
    "revision": 1,
    "name": "init-migrations",
    "created": "2022-12-02T10:44:12.090Z",
    "comment": ""
};

const migrationCommands = [

    {
        fn: "createTable",
        params: [
            "SequelizeMigrationsMeta",
            {
                "revision": {
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "state": {
                    "allowNull": false,
                    "type": Sequelize.JSON
                },
            },
            {}
        ]
    },
    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision
            }],
            {}
        ]
    },
    {
        fn: "bulkInsert",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
                name: info.name,
                state: '{"revision":1,"tables":{"Users":{"tableName":"Users","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"username":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"fullname":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"email":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"password":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"address":{"seqType":"Sequelize.STRING(128)","allowNull":false},"role":{"seqType":"Sequelize.STRING(128)","allowNull":false},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"SubCategories":{"tableName":"SubCategories","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"categoryId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"Categories","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"Orders":{"tableName":"Orders","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"userId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"Users","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"quantity":{"seqType":"Sequelize.INTEGER","allowNull":false},"orderNo":{"seqType":"Sequelize.STRING(40)","allowNull":false,"unique":true},"status":{"seqType":"Sequelize.STRING(10)","allowNull":false},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"ProductOrders":{"tableName":"ProductOrders","schema":{"productId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true,"references":{"model":"Products","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"orderId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true,"references":{"model":"Orders","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"quantity":{"seqType":"Sequelize.INTEGER","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"Products":{"tableName":"Products","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"categoryId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"Categories","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"subCategoryId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"SubCategories","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false,"unique":true},"imagePath":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"Categories":{"tableName":"Categories","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"Payments":{"tableName":"Payments","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"userId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"Users","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"orderNo":{"seqType":"Sequelize.STRING(40)","allowNull":false,"unique":true},"status":{"seqType":"Sequelize.STRING(10)","allowNull":false},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}}}}'
            }],
            {}
        ]
    },




    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "username": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "fullname": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "email": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "password": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "address": {
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "role": {
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "slug": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "Categories",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "slug": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "description": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "SubCategories",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "categoryId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Categories",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "slug": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "description": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "Orders",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "userId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "quantity": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "orderNo": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(40)
                },
                "status": {
                    "allowNull": false,
                    "type": Sequelize.STRING(10)
                },
                "slug": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "Products",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "categoryId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Categories",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "subCategoryId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "SubCategories",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "description": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "imagePath": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "slug": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "ProductOrders",
            {
                "productId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Products",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "orderId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Orders",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "quantity": {
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "Payments",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "userId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "orderNo": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(40)
                },
                "status": {
                    "allowNull": false,
                    "type": Sequelize.STRING(10)
                },
                "slug": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    }
];

const rollbackCommands = [

    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
            }],
            {}
        ]
    },



    {
        fn: "dropTable",
        params: ["SubCategories"]
    },
    {
        fn: "dropTable",
        params: ["Orders"]
    },
    {
        fn: "dropTable",
        params: ["Products"]
    },
    {
        fn: "dropTable",
        params: ["ProductOrders"]
    },
    {
        fn: "dropTable",
        params: ["Payments"]
    },
    {
        fn: "dropTable",
        params: ["Users"]
    },
    {
        fn: "dropTable",
        params: ["Categories"]
    }
];

module.exports = {
  pos: 0,
  up: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        } else resolve();
      }

      next();
    });
  },
  down: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < rollbackCommands.length) {
          let command = rollbackCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        }
        else resolve();
      }

      next();
    });
  },
  info
};
