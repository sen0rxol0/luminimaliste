<?php

namespace App\Http\Controllers;

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
            $token = 'token';
            $user = DB::select('SELECT * FROM users WHERE email = ?', [$request->input('email')]);
            if ($user && password_verify($request->input('password'), $user->password)) {
                return response()->json([
                    'success' => true,
                    'api_token' => $token
                ], 200);
            } else {
                return response()->json(['success' => false, 'error' => 'Bad credentials!'], 200);
            }
        } else {
            return response()->json(['success' => false, 'error' => 'Login credentials missing!'], 200);
        }
    }
}
