import 'package:flutter/material';
import '../main.dart';

class OcrEvaluationScreen extends StatefulWidget {
  const OcrEvaluationScreen({super.key});

  @override
  State<OcrEvaluationScreen> createState() => _OcrEvaluationScreenState();
}

class _OcrEvaluationScreenState extends State<OcrEvaluationScreen> {
  String _subject = 'Accounting';
  String _chapter = 'Partnership Valuation';
  String _difficulty = 'Medium';
  
  String? _compiledText;
  int? _marks;

  bool _fileUploaded = false;
  String _docType = 'Handwritten image';
  bool _evaluating = false;
  int? _score;
  String? _feedback;

  void _compilePaper() {
    setState(() {
      _compiledText = _subject == 'Accounting'
          ? "Compute sacrifice ratios on admission of new partner under Average Profit goodwill valuations."
          : "Define and compute short-term capital assets valuation under Section 45 transactional thresholds.";
      _marks = _subject == 'Accounting' ? 5 : 10;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Question compiled from database trends successfully!')),
    );
  }

  void _evaluatePaper() {
    if (!_fileUploaded) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please select or upload your answer sheets.')),
      );
      return;
    }
    if (_compiledText == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Compile a Generated Question Paper first.')),
      );
      return;
    }

    setState(() => _evaluating = true);
    
    // Simulate OCR delay
    Future.delayed(const Duration(seconds: 1), () {
      if (!mounted) return;
      setState(() {
        _score = 82;
        _feedback = _docType == 'Handwritten image'
            ? "Line 2: Legible handwriting detected. Good direct tax introduction.\n"
              "Line 14: Sacrifice ratio division has minor math errors. Deducted 2 marks.\n"
              "Overall: Excellent OMR presentation. Keep up the high standard!"
            : "Line 4: Correct section citations recorded. Section 15 CGST explained.\n"
              "Line 18: Perfect formatting using tabular illustrations matching model keys.";
        _evaluating = false;
      });

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Evaluation complete! Check score and comments.')),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      child: SingleChildScrollView(
        child: Column(
          children: [
            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'OMR & Handwriting OCR Evaluator',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 12),

            // Configurations Box
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: DropdownButtonFormField<String>(
                            value: _subject,
                            decoration: const InputDecoration(labelText: 'Subject'),
                            items: const [
                              DropdownMenuItem(value: 'Accounting', child: Text('Accounting')),
                              DropdownMenuItem(value: 'Direct Taxation', child: Text('Direct Tax')),
                              DropdownMenuItem(value: 'GST', child: Text('GST')),
                            ],
                            onChanged: (val) {
                              if (val != null) setState(() => _subject = val);
                            },
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: DropdownButtonFormField<String>(
                            value: _difficulty,
                            decoration: const InputDecoration(labelText: 'Difficulty'),
                            items: const [
                              DropdownMenuItem(value: 'Easy', child: Text('Easy')),
                              DropdownMenuItem(value: 'Medium', child: Text('Medium')),
                              DropdownMenuItem(value: 'Hard', child: Text('Hard')),
                            ],
                            onChanged: (val) {
                              if (val != null) setState(() => _difficulty = val);
                            },
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    ElevatedButton(
                      onPressed: _compilePaper,
                      style: ElevatedButton.styleFrom(backgroundColor: PastelColors.blue),
                      child: const Text('Compile Generated Question Paper'),
                    ),
                  ],
                ),
              ),
            ),

            if (_compiledText != null) ...[
              const SizedBox(height: 12),
              Card(
                color: PastelColors.yellow,
                child: Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Compiled Question (${_marks} Marks):', style: const TextStyle(fontWeight: FontWeight.bold, color: PastelColors.yellowDark)),
                      const SizedBox(height: 6),
                      Text(_compiledText!, style: const TextStyle(fontStyle: FontStyle.italic, fontSize: 13)),
                    ],
                  ),
                ),
              ),
            ],
            const SizedBox(height: 12),

            // File upload Simulator
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: [
                    InkWell(
                      onTap: () => setState(() => _fileUploaded = true),
                      child: Container(
                        height: 90,
                        width: double.infinity,
                        decoration: BoxDecoration(
                          border: Border.all(color: Colors.grey.shade300, style: BorderStyle.values[1]),
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Center(
                          child: Text(
                            _fileUploaded ? '📄 Selected: answer_sheet.jpg' : '📂 Click to choose answer sheet',
                            style: const TextStyle(color: Colors.grey, fontSize: 13),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(
                          child: DropdownButtonFormField<String>(
                            value: _docType,
                            decoration: const InputDecoration(labelText: 'Doc Type'),
                            items: const [
                              DropdownMenuItem(value: 'Handwritten image', child: Text('Handwritten Photo')),
                              DropdownMenuItem(value: 'Typed PDF', child: Text('Typed PDF')),
                            ],
                            onChanged: (val) {
                              if (val != null) setState(() => _docType = val);
                            },
                          ),
                        ),
                        const SizedBox(width: 12),
                        ElevatedButton(
                          onPressed: _evaluatePaper,
                          style: ElevatedButton.styleFrom(backgroundColor: PastelColors.green),
                          child: const Text('OCR Evaluate'),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),

            if (_score != null) ...[
              const SizedBox(height: 16),
              Card(
                color: Colors.white,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.between,
                        children: [
                          const Text('Evaluation Grading Matrix', style: TextStyle(fontWeight: FontWeight.bold)),
                          Text('Score: $_score / 100', style: const TextStyle(color: PastelColors.greenDark, fontWeight: FontWeight.bold, fontSize: 16)),
                        ],
                      ),
                      const Divider(),
                      const SizedBox(height: 4),
                      const Text('Line-by-line constructive comments:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                      const SizedBox(height: 6),
                      Text(
                        _feedback!,
                        style: const TextStyle(fontSize: 11, fontFamily: 'monospace', color: Colors.black54),
                      ),
                    ],
                  ),
                ),
              ),
            ],

          ],
        ),
      ),
    );
  }
}
