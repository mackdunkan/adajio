<?php
header("Content-Type: application/json; charset=UTF-8");
$param = json_decode($_REQUEST["param"]);
$to      = 'mackdunkan@gmail.com';
$subject = 'Заявка';
$message = $result;

$headers = "From: no-reply@ak-adagio-sochi.ru" . "\r\n";
$headers .= "Reply-To: manager@ak-adagio-sochi.ru" . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

$message = '<html><body>';
$message .= '<table rules="all" width="540px" style="border-color: #666;" cellpadding="10">';
$message .= "<thead><tr><th>Имя</th><th width='100%'>Данные</th></tr></thead>";
$message .= "<tr style='background: #eee;'><td><strong>Phone:</strong> </td><td>" . $param->phone . "</td></tr>";
$message .= "<tr><td><strong>ID Формы:</strong> </td><td>" . $param->idAndGoal . "</td></tr>";
$message .= "<tr><td colspan='2' align='center'><h4><strong>UTM</strong></h4></td></tr>";
$message .= "<tr><td><strong>utm_source:</strong> </td><td>" . $param->utm_source . "</td></tr>";
$message .= "<tr><td><strong>utm_medium:</strong> </td><td>" . $param->utm_medium . "</td></tr>";
$message .= "<tr><td><strong>utm_campaign:</strong> </td><td>" . $param->utm_campaign . "</td></tr>";
$message .= "<tr><td><strong>utm_content:</strong> </td><td>" . $param->utm_content . "</td></tr>";
$message .= "<tr><td><strong>utm_term:</strong> </td><td>" . $param->utm_term . "</td></tr>";
$message .= "<tr><td colspan='2' align='center'><h4><strong>MORE</strong></h4></td></tr>";
$message .= "<tr><td><strong>location:</strong> </td><td>" . $param->location . "</td></tr>";
$message .= "</table>";
$message .= "</body></html>";

mail($to, $subject, $message, $headers);
echo "success"
?>
