module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node',
  moduleNameMapper: {
    "@ioc:Adonis/Lucid/Orm": "<rootDir>/node_modules/@adonisjs/lucid/build/src/Orm"
  },
  moduleDirectories: [
    'node_modules'
  ]
}