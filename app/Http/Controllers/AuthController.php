<?php

namespace App\Http\Controllers;

use Illuminate\Auth\GenericUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function attemptLogin(Request $request) {
        if ($request->has(['email', 'password'])) {
            $user = DB::select('SELECT * FROM users WHERE email = ?', [$request->input('email')]);
            if (!empty($user)) {
                $user = new GenericUser((array) $user[0]);
                if (password_verify(hash('sha512', $request->input('password')), $user->password)) {
                    $token = $user->api_token;
                    return response()->json([
                        'success' => true,
                        'api_token' => $token
                    ], 200);
                }
            }
            return response()->json(['success' => false, 'error' => 'Bad credentials!'], 200);
        } else {
            return response()->json(['success' => false, 'error' => 'Login credentials missing!'], 200);
        }
    }
}
