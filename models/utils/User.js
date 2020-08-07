  
const db = require('../db');

module.exports = db.defineModel('users', {
    email: {
        type: db.STRING(100),
        unique: true,
        validate: {
          isEmail: true
        }
    },
    passwd: db.STRING(100),
    name: {
      type: db.STRING(100),
      unique: true,
      validate: {
        notEmpty: true,
        isCurrent(value) {
          var regCh = /^[\u4e00-\u9fa50-9a-zA-Z_]{1,}$/
          if (!regCh.test(value)) {
            throw new Error('Nickname just includes chinese、English、Number and Underline')
          }
        }
      }
    },
    aboutme: {
      type: db.STRING,
      allowNull: true,
      get() {
        const content = this.getDataValue('aboutme')
        console.log(content)
        if (content) return content
        return this.getDataValue('name') + "'s aboutme"
      },
      set(val) {
        return this.setDataValue('aboutme', val.toUpperCase())
      }
    },
    gender: {
      type: db.STRING,
      allowNull: true,
      set(val) {
        if (val) {
          this.setDataValue('gender', val)
        } else {
          this.setDataValue('gender', 0)
        }
      }
    }
}, {
  getterMethods: {
    getcapitalname() {
      return this.getDataValue('name').toUpperCase()
    }
  },
  validate: {
    requiredNameOrEmail() {
      if (!(this.name || this.email)) {
        throw new Error('Required name or email!')
      }
    }
  }
});