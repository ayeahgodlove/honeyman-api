'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "description" to table "Categories"
 * addColumn "description" to table "SubCategories"
 *
 **/

const info = {
    "revision": 2,
    "name": "init-migrations",
    "created": "2022-11-29T14:57:23.591Z",
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
                state: '{"revision":2,"tables":{"Categories":{"tableName":"Categories","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"SubCategories":{"tableName":"SubCategories","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"categoryId":{"seqType":"Sequelize.INTEGER","allowNull":false,"references":{"model":"Categories","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"Users":{"tableName":"Users","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"username":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"fullname":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"email":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"password":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"address":{"seqType":"Sequelize.STRING(128)","allowNull":false},"role":{"seqType":"Sequelize.STRING(128)","allowNull":false},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"Products":{"tableName":"Products","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"categoryId":{"seqType":"Sequelize.INTEGER","allowNull":false,"references":{"model":"Categories","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"subCategoryId":{"seqType":"Sequelize.INTEGER","allowNull":false,"references":{"model":"SubCategories","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false,"unique":true},"imagePath":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"Orders":{"tableName":"Orders","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"userId":{"seqType":"Sequelize.INTEGER","allowNull":false,"references":{"model":"Users","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"productId":{"seqType":"Sequelize.INTEGER","allowNull":false,"references":{"model":"Products","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"orderNo":{"seqType":"Sequelize.STRING(40)","allowNull":false,"unique":true},"status":{"seqType":"Sequelize.STRING(10)","allowNull":false},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"Payments":{"tableName":"Payments","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"userId":{"seqType":"Sequelize.INTEGER","allowNull":false,"references":{"model":"Users","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"orderNo":{"seqType":"Sequelize.STRING(40)","allowNull":false,"unique":true},"status":{"seqType":"Sequelize.STRING(10)","allowNull":false},"slug":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}}}}'
            }],
            {}
        ]
    },



    {
        fn: "addColumn",
        params: [
            "Categories",
            "description",
            {
                "allowNull": false,
                "type": Sequelize.TEXT
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "SubCategories",
            "description",
            {
                "allowNull": false,
                "type": Sequelize.TEXT
            }
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
        fn: "removeColumn",
        params: ["Categories", "description"]
    },
    {
        fn: "removeColumn",
        params: ["SubCategories", "description"]
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
