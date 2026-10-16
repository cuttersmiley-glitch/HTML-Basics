<?php

$surname = $_POST['surname'];
$othername = $_POST['othername'];
$gender = $_POST['gender'];
$show = $_POST['show'];

echo "<h2>Survey Result</h2>";
echo "Full Name: " . $surname . " " . $othername . "<br>";
echo "Gender: " . $gender . "<br>";
echo "Favourite Show: " . $show . "<br>";

?>