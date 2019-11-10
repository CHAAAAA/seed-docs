---
title: 开发流程
---

## 工程结构

一般工程结构如下，也可以根据团队需求自定制定。

```sh
|- controller  # 控制器
|- dao  # 数据访问层
  |- xml  # 如果使用xml文件，可以放在这里
|- domain  # 对象实体
|- service # 业务逻辑层，一般只放业务逻辑层的结构
  |- impl  # 业务逻辑层的实现
```

## 使用 MyBatis 开发数据访问层

首先给出示例：

```java
@Mapper
public interface SysUserDao {
    /**
     * 获取数据对象
     */
    @Select("SELECT * from " + Constant.TABLE_SYS_USER + " where NAME like #{name}")
    List<SysUser> getUser(@Param("name") String name);

    /**
     * 获取多行数据
     */
    @Select("SELECT * from " + Constant.TABLE_SYS_USER + " ORDER BY ${orderBy}")
    List<SysUser> getUserList(@NotNull @Param("orderBy") String orderBy);

    /**
     * 获取数据，返回HashMap
     */
    @Select("SELECT NAME, xhzgh, BIRTH, AGE from " + Constant.TABLE_SYS_USER + " where NAME like #{name}")
    List<ResultSetHashMap> getUserInfo(@Param("name") String name);

    /**
     * 更新数据
     */
    @Update("update " + Constant.TABLE_SYS_USER + " set age=#{user.age} where xhzgh =#{user.xhzgh}")
    int updateUserByXhzgh(@Param("user") SysUser user);

    /**
     * 插入数据
     */
    @Insert("INSERT into " + Constant.TABLE_SYS_USER +
            " (ID,NAME,XHZGH,BIRTH,AGE,GENDER,CREATE_DATE,COMMENTS) " +
            " values " +
            " (to_char(sysdate,'YYYYMMDDHHMISS') || to_char((" + Constant.SEQ_SYS_USER + ".nextval), 'fm000000'), " +
            " #{user.name},#{user.xhzgh}, #{user.birth}, #{user.age}, #{user.gender}, sysdate, #{user.comments, jdbcType=CLOB})")
    int insertUser(@Param("user") SysUser user);

    /**
     * 删除数据
     */
    @Delete("delete from " + Constant.TABLE_SYS_USER + " where name=#{badName} ")
    int deleteUser(String badName);
}
```

注意事项：

- 数据访问层的类，必须使用 `@Mapper` 注解，表名该类为 MyBatis 的数据访问接口。
- 方法上使用 `@Select`、`@Update`、`@Insert`、`@Delete` 这四个注解进行标注，分别表示查询、更新、插入和删除操作。
- 方法参数在 SQL 中的使用
  - `#{name}` 表示对传入字段进行参数化，避免 SQL 注入的问题，等同于 beehive 的 `{name}`
  - `${orderBy}`表示直接将传入的字符串拼在 SQL 中，存在注入问题，等同于 beehive 的 `{sql: orderBy}`
- 当查询返回多条数据时，如果函数返回值不是`List`将导致抛出异常，因此查询时最好使用`List`作为返回值。这点跟 beehive 不同，当返回值不是`List`时 beehive 会自动选择第一条数据返回。
- seed 项目封装了一个 `ResultSetHashMap` 类，可作为返回值为 `Map` 时使用，该类主要解决使用返回数据时 Key 值大小写的问题，使用该类后可以将小写的数据库字段名作为 Key 值获取数据。该类仿照了 beehive 中 `ResultSetHashMap` 的实现。
- `@Param` 注解是对传入参数在 SQL 中的命名，不使用`@Param`注解在使用上有一些限制[参考](https://blog.csdn.net/qq_33535433/article/details/78756664)，因此推荐所有参数都是使用该注解。
