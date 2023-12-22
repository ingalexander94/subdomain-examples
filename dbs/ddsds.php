<?php
require_once('../../wp-load.php');


function create_kid()
{
    try {
        $res = ["ok" => false, "message" => "No ha iniciado sesión", "data" => null];
        $user_id = get_current_user_id();
        if ($user_id == 0) {
            http_response_code(400);
        } else {
            $data = file_get_contents('php://input');
            $data = json_decode($data, true);
            $fullname = $data["fullname"];
            $username = $data["username"];
            $password = $data["password"];
            $avatar = $data["avatar"];
            $exist = username_exists($username);
            if ($exist) {
                $res = ["ok" => false, "message" => "El nombre de usuario ya está registrado.", "data" => null];
                http_response_code(404);
            } else {
                $kid_id = wp_create_user($username, $password, "");
                if (!is_wp_error($kid_id)) {
                    update_user_meta($kid_id, 'user_host', $user_id);
                    update_user_meta($kid_id, '_lp_profile_picture', $avatar);
                    wp_update_user(['ID' => $kid_id, 'display_name' => $fullname, 'role' => "kids"]);
                    $res = ["ok" => true, "message" => "Usuario creado exitosamente.", "data" => null];
                    http_response_code(200);
                } else {
                    $res = ["ok" => false, "message" => "No fue posible crear el usuario.", "data" => null];
                    http_response_code(400);
                }
            }
        }
    } catch (Exception $e) {
        $res = ["ok" => false, "message" => $e->getMessage(), "data" => null];
        http_response_code(500);
    } finally {
        header("Content-Type: application/json");
        return json_encode($res);
    }
}

header("Access-Control-Allow-Origin: https://umake.com.co");
header("Access-Control-Allow-Methods: POST, OPTIONS");
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $create_kid = create_kid();
    echo $create_kid;
} else {
    http_response_code(405);
    echo json_encode(["ok" => false, "message" => "Metodo no permitido", "data" => null]);
}
