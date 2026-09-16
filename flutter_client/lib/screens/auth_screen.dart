import 'package:flutter/material';
import '../main.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  bool _showRegister = false;
  final _loginController = TextEditingController();
  final _passwordController = TextEditingController();

  // Registration controllers
  final _regNameController = TextEditingController();
  final _regEmailController = TextEditingController();
  final _regPhoneController = TextEditingController();
  String _examLevel = 'Intermediate';
  bool _otpVerified = false;

  void _handleLogin() {
    if (_loginController.text.isEmpty || _passwordController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter email/User-ID and password.')),
      );
      return;
    }
    // Auth Flow Routing: Successfully entering credentials points directly to dashboard
    Navigator.pushReplacementNamed(context, '/dashboard');
  }

  void _handleRegister() {
    if (_regNameController.text.isEmpty || _regEmailController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill name and email.')),
      );
      return;
    }
    
    // Auth Flow Routing: Upon a successful registration action, automatically route back to Login Page
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Registration Successful! Route back to Login.')),
    );
    setState(() {
      _showRegister = false;
      _loginController.text = "CAJS" + (1000 + _regNameController.text.length).toString();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFFF3F6FC), Color(0xFFFAEEF6), Color(0xFFEAEEFC)],
          ),
        ),
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24.0),
            child: Card(
              child: Padding(
                padding: const EdgeInsets.all(32.0),
                child: SizedBox(
                  width: 380,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Header Logo
                      Container(
                        width: 56,
                        height: 56,
                        decoration: BoxDecoration(
                          color: PastelColors.blue,
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: const Center(
                          child: Text(
                            'JS',
                            style: TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                              color: PastelColors.blueDark,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      const Text(
                        'CA JS',
                        style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
                      ),
                      const Text(
                        'CA Success Suite Workspace',
                        style: TextStyle(color: Colors.grey, fontSize: 13),
                      ),
                      const SizedBox(height: 32),

                      if (!_showRegister) ...[
                        // LOGIN FORM
                        const Align(
                          alignment: Alignment.centerLeft,
                          child: Text('Email or User ID', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 12)),
                        ),
                        const SizedBox(height: 6),
                        TextField(
                          controller: _loginController,
                          decoration: InputDecoration(
                            hintText: 'jananni.k@cajs.com',
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                          ),
                        ),
                        const SizedBox(height: 16),
                        const Align(
                          alignment: Alignment.centerLeft,
                          child: Text('Password', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 12)),
                        ),
                        const SizedBox(height: 6),
                        TextField(
                          controller: _passwordController,
                          obscureText: true,
                          decoration: InputDecoration(
                            hintText: '••••••••',
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                          ),
                        ),
                        const SizedBox(height: 24),
                        ElevatedButton(
                          onPressed: _handleLogin,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: PastelColors.blue,
                            foregroundColor: PastelColors.blueDark,
                            minimumSize: const Size.fromHeight(50),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                          ),
                          child: const Text('Login', style: TextStyle(fontWeight: FontWeight.bold)),
                        ),
                        const SizedBox(height: 16),
                        OutlinedButton(
                          onPressed: () => setState(() => _showRegister = true),
                          style: OutlinedButton.styleFrom(
                            minimumSize: const Size.fromHeight(50),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                          ),
                          child: const Text('Register New Account'),
                        ),
                      ] else ...[
                        // REGISTER FORM
                        const Align(
                          alignment: Alignment.centerLeft,
                          child: Text('Full Name', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 12)),
                        ),
                        const SizedBox(height: 6),
                        TextField(
                          controller: _regNameController,
                          decoration: InputDecoration(
                            hintText: 'Jananni Kumar',
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                            contentPadding: const EdgeInsets.all(12),
                          ),
                        ),
                        const SizedBox(height: 12),
                        const Align(
                          alignment: Alignment.centerLeft,
                          child: Text('Email ID', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 12)),
                        ),
                        const SizedBox(height: 6),
                        TextField(
                          controller: _regEmailController,
                          decoration: InputDecoration(
                            hintText: 'jananni.k@cajs.com',
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                            contentPadding: const EdgeInsets.all(12),
                          ),
                        ),
                        const SizedBox(height: 12),
                        const Align(
                          alignment: Alignment.centerLeft,
                          child: Text('Phone Number', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 12)),
                        ),
                        const SizedBox(height: 6),
                        Row(
                          children: [
                            Expanded(
                              child: TextField(
                                controller: _regPhoneController,
                                decoration: InputDecoration(
                                  hintText: '9876543210',
                                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                                  contentPadding: const EdgeInsets.all(12),
                                ),
                              ),
                            ),
                            const SizedBox(width: 8),
                            // dedicated trigger for OTP verification
                            TextButton(
                              onPressed: () {
                                setState(() => _otpVerified = true);
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(content: Text('OTP Verified successfully! (Code: 1234)')),
                                );
                              },
                              style: TextButton.styleFrom(
                                backgroundColor: PastelColors.pink,
                                foregroundColor: PastelColors.pinkDark,
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                              ),
                              child: const Text('Verify OTP'),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        const Align(
                          alignment: Alignment.centerLeft,
                          child: Text('Exam Level', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 12)),
                        ),
                        const SizedBox(height: 6),
                        // Exam Level selection dropdown options
                        DropdownButtonFormField<String>(
                          value: _examLevel,
                          decoration: InputDecoration(
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                            contentPadding: const EdgeInsets.symmetric(horizontal: 12),
                          ),
                          items: const [
                            DropdownMenuItem(value: 'Foundation', child: Text('CA Foundation')),
                            DropdownMenuItem(value: 'Intermediate', child: Text('CA Intermediate')),
                            DropdownMenuItem(value: 'Final', child: Text('CA Final')),
                          ],
                          onChanged: (val) {
                            if (val != null) setState(() => _examLevel = val);
                          },
                        ),
                        const SizedBox(height: 20),
                        ElevatedButton(
                          onPressed: _handleRegister,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: PastelColors.green,
                            foregroundColor: PastelColors.greenDark,
                            minimumSize: const Size.fromHeight(50),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                          ),
                          child: const Text('Register Account', style: TextStyle(fontWeight: FontWeight.bold)),
                        ),
                        const SizedBox(height: 12),
                        // Back to Login alternative routing
                        TextButton(
                          onPressed: () => setState(() => _showRegister = false),
                          child: const Text('Back to Login', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
