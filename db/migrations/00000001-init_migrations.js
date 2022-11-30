'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Categories", deps: []
 * createTable "Users", deps: []
 * createTable "SubCategories", deps: [Categories]
 * createTable "Products", deps: [Categories, SubCategories]
 * createTable "Orders", deps: [Users, Products]
 * createTable "Payments", deps: [Users]
 *
 **/

const info = {
    "revision": 1,
    "name": "init-migrations",
    "created": "2022-11-29T14:55:13.970Z",
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
                state: '{"revision":1,"tables":{"Categories":{"tableName":"Categories","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"SubCategories":{"tableName":"SubCategories","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"categoryId":{"seqType":"Sequelize.INTEGER","allowNull":false,"references":{"model":"Categories","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"Users":{"tableName":"Users","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"username":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"fullname":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"email":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"password":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"address":{"seqType":"Sequelize.STRING(128)","allowNull":false},"role":{"seqType":"Sequelize.STRING(128)","allowNull":false},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"Products":{"tableName":"Products","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"categoryId":{"seqType":"Sequelize.INTEGER","allowNull":false,"references":{"model":"Categories","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"subCategoryId":{"seqType":"Sequelize.INTEGER","allowNull":false,"references":{"model":"SubCategories","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false,"unique":true},"imagePath":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"Orders":{"tableName":"Orders","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"userId":{"seqType":"Sequelize.INTEGER","allowNull":false,"references":{"model":"Users","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"productId":{"seqType":"Sequelize.INTEGER","allowNull":false,"references":{"model":"Products","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"orderNo":{"seqType":"Sequelize.STRING(40)","allowNull":false,"unique":true},"status":{"seqType":"Sequelize.STRING(10)","allowNull":false},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"Payments":{"tableName":"Payments","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"userId":{"seqType":"Sequelize.INTEGER","allowNull":false,"references":{"model":"Users","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"orderNo":{"seqType":"Sequelize.STRING(40)","allowNull":false,"unique":true},"status":{"seqType":"Sequelize.STRING(10)","allowNull":false},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}}}}'
            }],
            {}
        ]
    },




    {
        fn: "createTable",
        params: [
            "Categories",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
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
            "Users",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
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
            "SubCategories",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "categoryId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Categories",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.INTEGER
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
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "categoryId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Categories",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "subCategoryId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "SubCategories",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.INTEGER
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
            "Orders",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "userId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "productId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Products",
                        "key": "id"
                    },
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
            "Payments",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.INTEGER
                },
                "userId": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
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
        params: ["Products"]
    },
    {
        fn: "dropTable",
        params: ["Orders"]
    },
    {
        fn: "dropTable",
        params: ["Payments"]
    },
    {
        fn: "dropTable",
        params: ["Categories"]
    },
    {
        fn: "dropTable",
        params: ["Users"]
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
