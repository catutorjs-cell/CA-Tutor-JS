import 'package:flutter/material';
import 'package:google_fonts/google_fonts.dart';
import 'screens/auth_screen.dart';
import 'screens/dashboard_screen.dart';

void main() {
  runApp(const CaJsSuccessSuiteApp());
}

class CaJsSuccessSuiteApp extends StatelessWidget {
  const CaJsSuccessSuiteApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CA JS Success Suite',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        fontFamily: GoogleFonts.plusJakartaSans().fontFamily,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF3A82E9),
          background: const Color(0xFFF5F7FB),
          surface: Colors.white.withOpacity(0.8),
          primary: const Color(0xFF3A82E9),
          secondary: const Color(0xFF8C52FF),
          error: const Color(0xFFF04438),
        ),
        cardTheme: CardTheme(
          color: Colors.white.withOpacity(0.75),
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(24),
            side: BorderSide(color: Colors.white.withOpacity(0.6), width: 1),
          ),
        ),
      ),
      initialRoute: '/auth',
      routes: {
        '/auth': (context) => const AuthScreen(),
        '/dashboard': (context) => const DashboardScreen(),
      },
    );
  }
}

// Global Pastel Palette Reference
class PastelColors {
  static const Color blue = Color(0xFFE3EFFD);
  static const Color blueDark = Color(0xFF3A82E9);
  
  static const Color pink = Color(0xFFFDE8ED);
  static const Color pinkDark = Color(0xFFE85876);
  
  static const Color purple = Color(0xFFF3EBFD);
  static const Color purpleDark = Color(0xFF8C52FF);
  
  static const Color green = Color(0xFFE6F6EE);
  static const Color greenDark = Color(0xFF12B76A);
  
  static const Color yellow = Color(0xFFFFF9E6);
  static const Color yellowDark = Color(0xFFEAAA08);

  static const Color orange = Color(0xFFFEF0E6);
  static const Color orangeDark = Color(0xFFF04438);
}
