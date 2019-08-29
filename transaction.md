# 二
1. SELECT 姓名 FROM 员工 ORDER BY 职称 DESC 

2. SELECT 员工编号，SUM（工时） FROM 施工
GROUP BY 员工编号 HAVING SUM（工时）>=480

3. SELECT 姓名，部门名称
FROM 员工，部门，项目，施工
WHERE 部门.部门编号=员工.部门编号 AND 员工.员工编号=施工.员工编号

AND 施工.项目编号=项目.项目编号 AND 职称=‘高级工程师’ AND 预算>1000000

4. CREATE VIEW 工作量( 员工编号，姓名，项目名称，工时) AS SELECT员工.员工编号，姓名，项目名称，工时 FROM 员工，项目，施工
WHERE员工.员工编号=施工.员工编号AND 施工.项目编号=项目.项目编号

5. UPDATE 施工
SET 工时=工时+50 WHERE 项目编号 IN (SELECT 项目编号 FROM 项目
WHERE 项目名称=‘高教新区项目’)

6. CREATE PROCEDURE proc_cal(IN 部门号 int) 
BEGIN
    select count(工时) from 施工,员工
    where 施工.员工编号 = 员工.员工编号
END