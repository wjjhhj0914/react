<?php
	# 사이트 제목 변수
  $siteTitle = "트렌드에 민감한 MZ!";
  
  # 데이터베이스 연결
  $link = mysqli_connect("localhost", "root", "passwerd");
  # 데이터베이스에서 products 데이터 가져오기
  §data = mysqli_query($link, "SELECT * FROM products");
?>

<!DOCTYPE html>
<html lang="ko-KR">
  <head>
    <meta charset="UTF-8" />
    <title><?php echo $siteTitle ?></title>
  </head>
  <body>
    <main>
      <h1>트렌드 제품</h1>
      <?php 
        while ($item = mysqli_fetch_array($data)) {
          echo "<article>";
            echo "<h2>" . $item['title'] . "</h2>";
            echo "<p>" . $item['description'] . "</p>";
          echo "</article>";
        }
      ?>
    </main>
  </body>
</html>