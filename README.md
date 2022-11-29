### Hexlet tests and linter status:
[![Actions Status](https://github.com/jacksonrr3/difference-checker/workflows/hexlet-check/badge.svg)](https://github.com/jacksonrr3/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/d47819eb72f2328fca4c/maintainability)](https://codeclimate.com/github/jacksonrr3/difference-checker/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d47819eb72f2328fca4c/test_coverage)](https://codeclimate.com/github/jacksonrr3/difference-checker/test_coverage)

Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. 
Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

Возможности утилиты:

Поддержка разных входных форматов: yaml, json
Генерация отчета в виде plain text, stylish и json
Пример использования:

```
# формат plain
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# формат stylish
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}```
