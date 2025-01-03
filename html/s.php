
<?php
$gett = $_GET["q"];
//获取数据，那个q写在函数xmlhttp.open("GET","mysql.php?q="+str,true)这里面，我惊呆了，根本不像话
 
$con = mysqli_connect('192.168.x.xxx:3306','yonghu','mima');
//这里是数据库操作基本的语句，连接MySQL数据库，需要写数据库地址，管理数据库的账号和密码
//这里提一个醒，如果是MySQL听说是密码账户加密了，当初在ubantu上安装时设置的账号密码不能用
//我只能设置一个远程的账户，给所有权限，参考网址：https://bbs.csdn.net/topics/340186098
if (!$con)
{
    die('Could not connect: ' . mysqli_error($con));
}

// 选择数据库
mysqli_select_db($con,"mydb");

// 设置编码，防止中文乱码
mysqli_set_charset($con, "utf8");

// 这里讲一下，litter_classify是数据表（table）名字，where的就是找litter_name=【报纸】的那一行
//直接写 '$get' 也可以的，加两个点我要干哈
$sql="SELECT * FROM litter_classify WHERE litter_name = '".$gett."'";
 
//这是MySQL执行语句，很important的，敲黑板!!!
//可以采用变量 $sql 形式
//也可以直接MySQL语句直接干"SELECT * FROM litter_classify WHERE litter_name = '报纸'"
$result = mysqli_query($con,$sql);
 
 //php的 echo 语句功能非常的强大，可以写HTML语句，加个class id 的还能设置css样式，amazing！！！
 //html 的table 是表格 ，tr是表格的一行，th是表头，td是表的单元格
 //注意用 echo 要把HTML语句打完整，有头有尾</table></table>，注意一下
 //border=“1” 是设置表的边框
echo "<table border='1'>
<tr>
<th>ID</th>
<th>垃圾</th>
<th>分类</th>
</tr>";
 
//这个 while 循环很精髓，打印表格必备  $row[]括号里面写的是数据库的列名，需要哪一列写哪一列
//那个格式要写对，不要漏点，漏引号之类的
while($row = mysqli_fetch_array($result))
{
    echo "<tr>";
    echo "<td>" . $row['litter_id'] . "</td>";
    echo "<td>" . $row['litter_name'] . "</td>";
    echo "<td>" . $row['litter_style'] . "</td>";
    echo "</tr>";
}
echo "</table>";
 
mysqli_close($con);//有始有终，又开有关，释放资源
?>