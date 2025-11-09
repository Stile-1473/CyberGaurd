
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// CSS Variables for theme tokens
const themeTokens = {
  '--cg-bg': '#0a0a0a',
  '--cg-panel': '#1a1a1a',
  '--cg-accent': '#00d4aa',
  '--cg-success': '#10b981',
  '--cg-warning': '#f59e0b',
  '--cg-danger': '#ef4444',
  '--cg-info': '#3b82f6',
  '--cg-text': '#e5e7eb',
  '--cg-text-secondary': '#9ca3af'
};

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showIntro, setShowIntro] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(400);
  const [matrixMode, setMatrixMode] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);


  const asciiLogo = `
 ██████╗██╗   ██╗██████╗ ███████╗██████╗  ██████╗ ██╗   ██╗ █████╗ ██████╗ ██████╗
██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗██╔════╝ ██║   ██║██╔══██╗██╔══██╗██╔══██╗
██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝██║  ███╗██║   ██║███████║██████╔╝██║  ██║
██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗██║   ██║██║   ██║██╔══██║██╔══██╗██║  ██║
╚██████╗   ██║   ██████╔╝███████╗██║  ██║╚██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
 ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝
  `;

  // Command definitions with descriptions
  const commands = {
    about: {
      description: "Company overview and mission",
      output: "We’re CyberGuard, a leading cybersecurity firm protecting organizations from digital threats through advanced security solutions and expert consulting."
    },
    services: {
      description: "Show available CyberGuard services",
      output: "Penetration Testing · Vulnerability Assessment · Incident Response · Security Audits · Threat Intelligence · Compliance Management"
    },
    work: {
      description: "Showcase of successful projects",
      output: [
        "[Breach Prevention for TechCorp — Zero incidents in 2 years]",
        "[Compliance Audit for FinSecure — Achieved SOC 2 certification]",
        "[Incident Response for RetailNet — Contained breach in 4 hours]",
        "[Threat Hunting for HealthSys — Identified 50+ vulnerabilities]"
      ]
    },
    contact: {
      description: "Contact information",
      output: "info@cyberguard.com | LinkedIn: /company/cyberguard | Twitter: @cyberguardsec"
    },
    help: {
      description: "List commands and quick usage tips",
      output: "Available commands: about, services, work, contact, scan, threats, alerts, encrypt, decrypt, firewall, logs, vulnerabilities, honeypot, intrusion, backup, patch, compliance, network, forensics, incident, training, policy, matrix, status, clear, help\n\nTips:\n• Press Tab to autocomplete commands\n• Use ↑/↓ to cycle command history\n• Long-press command chips for advanced options"
    },
    clear: {
      description: "Clear terminal output",
      output: "CLEAR"
    },
    scan: {
      description: "Run a simulated security scan with progress",
      output: "SCAN_INITIATED"
    },
    threats: {
      description: "Fetch threat intelligence summary",
      output: [
        "[HIGH] Ransomware campaign targeting healthcare sector - CVE-2024-1234",
        "[MEDIUM] Phishing attempts using AI-generated emails - 150+ detections",
        "[LOW] Zero-day vulnerability in legacy systems - Monitoring active",
        "[HIGH] DDoS attacks on financial institutions - Mitigation deployed"
      ]
    },
    alerts: {
      description: "Show active security alerts",
      output: [
        "🚨 CRITICAL: Unauthorized access attempt detected on server-01",
        "⚠️ WARNING: Unusual traffic pattern from IP 192.168.1.100",
        "ℹ️ INFO: Security patch deployed successfully",
        "🚨 CRITICAL: Malware signature detected in email attachment"
      ]
    },
    encrypt: {
      description: "File encryption simulation",
      output: "ENCRYPTION_PROCESS"
    },
    decrypt: {
      description: "File decryption simulation",
      output: "DECRYPTION_PROCESS"
    },
    firewall: {
      description: "Firewall status and statistics",
      output: "Firewall Status: ACTIVE\nInbound Rules: 247\nOutbound Rules: 189\nBlocked Connections: 1,247\nLast Update: 2024-01-15 14:30:22"
    },
    logs: {
      description: "View recent security logs",
      output: [
        "[2024-01-15 14:30:22] INFO: User authentication successful - admin@cyberguard.com",
        "[2024-01-15 14:28:15] WARNING: Failed login attempt from IP 10.0.0.5",
        "[2024-01-15 14:25:03] ERROR: Database connection timeout",
        "[2024-01-15 14:20:45] INFO: Security scan completed - 0 vulnerabilities found",
        "[2024-01-15 14:15:30] ALERT: Suspicious file detected - quarantined"
      ]
    },
    vulnerabilities: {
      description: "Known vulnerabilities database",
      output: [
        "CVE-2021-44228 (Log4Shell) - CRITICAL - Apache Log4j RCE",
        "CVE-2021-34527 (PrintNightmare) - HIGH - Windows Print Spooler RCE",
        "CVE-2022-22965 (Spring4Shell) - CRITICAL - Spring Framework RCE",
        "CVE-2023-23397 - HIGH - Outlook Elevation of Privilege",
        "CVE-2023-36884 - MEDIUM - Microsoft Office/Outlook RCE"
      ]
    },
    honeypot: {
      description: "Honeypot status and captured data",
      output: [
        "🐝 HONEYPOT STATUS REPORT",
        "═══════════════════════════════════════",
        "Active Honeypots: 12",
        "Captured Attacks: 847",
        "Malware Samples: 23",
        "IP Addresses Blocked: 156",
        "Most Targeted Service: SSH (45%)",
        "Latest Capture: Ransomware variant from 185.234.72.91",
        "═══════════════════════════════════════",
        "Status: OPERATIONAL"
      ]
    },
    intrusion: {
      description: "Intrusion detection system logs",
      output: [
        "🛡️ INTRUSION DETECTION SYSTEM LOGS",
        "═══════════════════════════════════════",
        "[14:32:15] IDS Alert: Port scan detected from 192.168.1.50",
        "[14:28:42] IPS Block: SQL injection attempt blocked",
        "[14:25:18] IDS Alert: Brute force attack on admin portal",
        "[14:20:33] IPS Block: XSS attempt neutralized",
        "[14:15:07] IDS Alert: Unusual outbound traffic pattern",
        "═══════════════════════════════════════",
        "Total Events Today: 23 | Blocked: 18 | Monitored: 5"
      ]
    },
    backup: {
      description: "Run simulated backup steps",
      output: "BACKUP_PROCESS"
    },
    patch: {
      description: "Patch management dashboard",
      output: [
        "🔧 PATCH MANAGEMENT DASHBOARD",
        "═══════════════════════════════════════",
        "Critical Patches Pending: 3",
        "High Priority: 7",
        "Medium Priority: 12",
        "Low Priority: 5",
        "Systems Up-to-Date: 89%",
        "Last Patch Cycle: 2024-01-14",
        "Next Scheduled: 2024-01-21",
        "═══════════════════════════════════════",
        "Auto-Update: ENABLED | Compliance: 94%"
      ]
    },
    compliance: {
      description: "Compliance status overview",
      output: [
        "📋 COMPLIANCE STATUS OVERVIEW",
        "═══════════════════════════════════════",
        "SOC 2 Type II: ✅ COMPLIANT",
        "ISO 27001: ✅ CERTIFIED",
        "PCI DSS: ✅ COMPLIANT",
        "HIPAA: ✅ COMPLIANT",
        "GDPR: ⚠️ AUDIT DUE (30 days)",
        "NIST Framework: ✅ IMPLEMENTED",
        "Last Audit: 2023-11-15",
        "Next Audit: 2024-02-15",
        "═══════════════════════════════════════",
        "Overall Compliance Score: 96%"
      ]
    },
    network: {
      description: "Network monitoring status",
      output: [
        "🌐 NETWORK MONITORING STATUS",
        "═══════════════════════════════════════",
        "Active Connections: 1,247",
        "Bandwidth Usage: 67% (450 Mbps)",
        "Packets/sec: 12,847",
        "Latency: 12ms avg",
        "VPN Tunnels: 8 active",
        "DNS Queries: 2,341/min",
        "Blocked IPs: 156",
        "Anomalies Detected: 3 (investigating)",
        "═══════════════════════════════════════",
        "Network Health: EXCELLENT"
      ]
    },
    forensics: {
      description: "Digital forensics analysis",
      output: "FORENSICS_ANALYSIS"
    },
    incident: {
      description: "Incident response protocols",
      output: [
        "🚨 INCIDENT RESPONSE PROTOCOLS",
        "═══════════════════════════════════════",
        "PHASE 1: IDENTIFICATION",
        "  - Automated detection systems active",
        "  - 24/7 SOC monitoring enabled",
        "  - AI-powered threat correlation",
        "",
        "PHASE 2: CONTAINMENT",
        "  - Automated isolation protocols",
        "  - Traffic filtering activated",
        "  - Backup systems secured",
        "",
        "PHASE 3: ERADICATION",
        "  - Malware removal procedures",
        "  - System hardening applied",
        "  - Vulnerability remediation",
        "",
        "PHASE 4: RECOVERY",
        "  - System restoration protocols",
        "  - Data integrity verification",
        "  - Service continuity ensured",
        "",
        "PHASE 5: LESSONS LEARNED",
        "  - Post-incident analysis",
        "  - Process improvements",
        "  - Training updates",
        "═══════════════════════════════════════",
        "Response Time Goal: < 15 minutes"
      ]
    },
    training: {
      description: "Security training modules",
      output: [
        "🎓 SECURITY TRAINING MODULES",
        "═══════════════════════════════════════",
        "Available Courses:",
        "  1. Phishing Awareness - 95% completion",
        "  2. Password Security - 87% completion",
        "  3. Social Engineering - 78% completion",
        "  4. Incident Reporting - 92% completion",
        "  5. Data Handling - 83% completion",
        "",
        "Upcoming Sessions:",
        "  - Advanced Threat Hunting (Jan 25)",
        "  - Cloud Security Best Practices (Jan 28)",
        "  - Zero Trust Architecture (Feb 2)",
        "",
        "Compliance Training:",
        "  - GDPR Requirements - Required",
        "  - HIPAA Security - Required",
        "  - PCI DSS - Optional",
        "═══════════════════════════════════════",
        "Average Completion Rate: 89%"
      ]
    },
    policy: {
      description: "Security policy framework",
      output: [
        "📖 SECURITY POLICY FRAMEWORK",
        "═══════════════════════════════════════",
        "1. ACCESS CONTROL POLICY",
        "   - Role-based access control (RBAC)",
        "   - Multi-factor authentication required",
        "   - Least privilege principle enforced",
        "",
        "2. DATA PROTECTION POLICY",
        "   - Encryption at rest and in transit",
        "   - Data classification system",
        "   - Retention and disposal procedures",
        "",
        "3. INCIDENT RESPONSE POLICY",
        "   - 24/7 incident response team",
        "   - Escalation procedures defined",
        "   - Communication protocols established",
        "",
        "4. COMPLIANCE POLICY",
        "   - Regulatory requirements mapping",
        "   - Audit and assessment schedule",
        "   - Continuous monitoring requirements",
        "",
        "5. AWARENESS POLICY",
        "   - Mandatory security training",
        "   - Regular security communications",
        "   - Phishing simulation exercises",
        "═══════════════════════════════════════",
        "Last Updated: 2024-01-10 | Version: 3.2"
      ]
    },
    matrix: {
      description: "Toggle Matrix mode (visual only)",
      output: "MATRIX_MODE"
    },
    status: {
      description: "Show system & sensor health",
      output: [
        "📊 SYSTEM STATUS DASHBOARD",
        "═══════════════════════════════════════",
        "🔴 CPU Usage: 34% | Memory: 67% | Disk: 45%",
        "🟢 Network: HEALTHY | Latency: 12ms",
        "🟢 Security: ACTIVE | Threats: 0 active",
        "🟢 Backups: CURRENT | Last: 2 hours ago",
        "🟢 Compliance: 96% | Audits: PASSED",
        "🟡 Updates: 3 pending | Critical: 0",
        "🟢 Services: 24/24 online | Uptime: 99.9%",
        "🟢 Monitoring: ACTIVE | Alerts: 2 low-priority",
        "═══════════════════════════════════════",
        "Overall System Health: EXCELLENT"
      ]
    }
  };

  const suggestions = Object.keys(commands);

  // Apply theme tokens to CSS variables
  useEffect(() => {
    Object.entries(themeTokens).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            inputRef.current?.focus();
            break;
          case '/':
            e.preventDefault();
            setShowTips(!showTips);
            break;
        }
      }
      if (e.key === '?') {
        e.preventDefault();
        handleCommand('help');
      }
      if (e.key === 'Escape') {
        setInput('');
        setHistoryIndex(-1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showTips]);

  const simulateScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          const scanResult = [
            "🔍 SECURITY SCAN COMPLETED",
            "═══════════════════════════════════════",
            "Files Scanned: 15,247",
            "Vulnerabilities Found: 0",
            "Malware Detected: 0",
            "Suspicious Files: 2 (quarantined)",
            "Network Ports: 24 open (all secured)",
            "Firewall Status: ACTIVE",
            "Last Scan: " + new Date().toLocaleString(),
            "═══════════════════════════════════════",
            "✅ System Status: SECURE"
          ];
          setOutput(prev => [...prev, {
            command: 'scan',
            response: scanResult,
            timestamp: new Date().toLocaleTimeString(),
            type: 'scan'
          }]);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const simulateEncryption = (type) => {
    const process = type === 'encrypt' ? 'ENCRYPTION' : 'DECRYPTION';
    const steps = [
      `🔐 ${process} PROCESS INITIATED`,
      "═══════════════════════════════════════",
      "Generating cryptographic keys...",
      "Initializing secure channel...",
      "Processing data blocks...",
      "Applying encryption algorithm...",
      "Verifying integrity...",
      "═══════════════════════════════════════",
      `✅ ${process} COMPLETED SUCCESSFULLY`
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setOutput(prev => [...prev, {
          command: type,
          response: steps[stepIndex],
          timestamp: new Date().toLocaleTimeString(),
          type: 'process'
        }]);
        stepIndex++;
      } else {
        clearInterval(interval);
      }
    }, 300);
  };

  const simulateBackup = () => {
    const steps = [
      "💾 BACKUP PROCESS INITIATED",
      "═══════════════════════════════════════",
      "Scanning source directories...",
      "Compressing data files...",
      "Encrypting backup archive...",
      "Transferring to secure storage...",
      "Verifying backup integrity...",
      "Updating backup metadata...",
      "═══════════════════════════════════════",
      "✅ BACKUP COMPLETED SUCCESSFULLY",
      "📊 Backup Size: 2.4 GB | Duration: 45 seconds",
      "🔒 Encryption: AES-256 | Storage: Cloud Secure"
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setOutput(prev => [...prev, {
          command: 'backup',
          response: steps[stepIndex],
          timestamp: new Date().toLocaleTimeString(),
          type: 'process'
        }]);
        stepIndex++;
      } else {
        clearInterval(interval);
      }
    }, 400);
  };

  const simulateForensics = () => {
    const steps = [
      "🔍 DIGITAL FORENSICS ANALYSIS",
      "═══════════════════════════════════════",
      "Acquiring memory dump...",
      "Analyzing file system artifacts...",
      "Examining network connections...",
      "Scanning for malware signatures...",
      "Reviewing system logs...",
      "Correlating timeline events...",
      "Generating evidence report...",
      "═══════════════════════════════════════",
      "✅ FORENSICS ANALYSIS COMPLETE",
      "📋 Evidence Collected: 47 artifacts",
      "🚨 Suspicious Activities: 3 confirmed",
      "📄 Report Generated: forensics_20240115.pdf"
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setOutput(prev => [...prev, {
          command: 'forensics',
          response: steps[stepIndex],
          timestamp: new Date().toLocaleTimeString(),
          type: 'process'
        }]);
        stepIndex++;
      } else {
        clearInterval(interval);
      }
    }, 500);
  };

  const activateMatrixMode = () => {
    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
    let matrixText = "";
    for (let i = 0; i < 20; i++) {
      matrixText += matrixChars[Math.floor(Math.random() * matrixChars.length)];
    }

    setOutput(prev => [...prev, {
      command: 'matrix',
      response: [
        "🌐 ENTERING MATRIX MODE...",
        "═══════════════════════════════════════",
        `Initializing neural interface...`,
        `Loading system matrix... ${matrixText}`,
        "Bypassing security protocols...",
        "Accessing mainframe...",
        "Welcome to the Matrix, Neo.",
        "═══════════════════════════════════════",
        "🟢 MATRIX MODE ACTIVATED",
        "Type 'exit' to return to normal mode"
      ],
      timestamp: new Date().toLocaleTimeString(),
      type: 'matrix'
    }]);
  };

  const handleCommand = useCallback((cmd) => {
    const command = cmd.toLowerCase().trim();
    if (command === '') return;

    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);

    let response;
    if (command === 'clear') {
      setOutput([]);
      return;
    } else if (command === 'scan') {
      simulateScan();
      return;
    } else if (command === 'encrypt') {
      simulateEncryption('encrypt');
      return;
    } else if (command === 'decrypt') {
      simulateEncryption('decrypt');
      return;
    } else if (command === 'backup') {
      simulateBackup();
      return;
    } else if (command === 'forensics') {
      simulateForensics();
      return;
    } else if (command === 'matrix') {
      setMatrixMode(true);
      activateMatrixMode();
      return;
    } else if (command === 'exit' && matrixMode) {
      setMatrixMode(false);
      setOutput(prev => [...prev, {
        command: 'exit',
        response: "🟢 EXITING MATRIX MODE...\nReturning to CyberGuard Terminal.",
        timestamp: new Date().toLocaleTimeString(),
        type: 'normal'
      }]);
      return;
    } else if (commands[command]) {
      response = commands[command].output;
    } else {
      response = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    const newOutput = [...output, {
      command: cmd,
      response,
      timestamp: new Date().toLocaleTimeString(),
      type: 'normal'
    }];
    setOutput(newOutput);
    setInput('');
  }, [output, matrixMode]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        } else {
          setHistoryIndex(-1);
          setInput('');
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion for commands
      const matchingCommands = suggestions.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0]);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    inputRef.current.focus();
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-2 sm:p-4 flex flex-col relative overflow-hidden">
      {/* Matrix Rain Background (when matrix mode is active) */}
      {matrixMode && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-500 text-xs animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              {Array.from({ length: 20 }).map((_, j) => (
                <div key={j} style={{ marginTop: `${Math.random() * 15}px` }}>
                  {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Animated Shield Mascot - Hidden on mobile, visible on larger screens */}
      <motion.div
        className="hidden sm:block fixed bottom-4 right-4 text-4xl z-10"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🛡️
      </motion.div>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center relative z-10"
          >
            <div className="text-center px-2">
              <motion.pre
                className="text-green-400 text-xs sm:text-sm mb-4 whitespace-pre-line"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                {asciiLogo}
              </motion.pre>
              <motion.div
                className="text-xl sm:text-2xl md:text-4xl font-bold text-green-400 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                Welcome to CyberGuard Terminal
              </motion.div>
              <motion.div
                className="text-base sm:text-lg text-green-300"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                Advanced Cybersecurity Command Interface
              </motion.div>
              <motion.div
                className="text-xs sm:text-sm text-green-500 mt-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                Type a command or click a suggestion below
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col relative z-10"
        >
          {/* Glassmorphism Terminal Panel */}
          <div className="backdrop-blur-md bg-gray-900/80 border border-green-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl mb-4">
            <div className="mb-4">
              <h1 className="text-xl sm:text-2xl font-bold text-green-400 mb-2">CyberGuard Terminal</h1>
              <p className="text-green-300 text-xs sm:text-sm">Interactive Cybersecurity Firm Interface</p>
            </div>

          <div className="mb-4 flex flex-wrap gap-1 sm:gap-2 max-h-16 sm:max-h-20 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseDown={(e) => {
                  if (e.button === 0) { // Left click
                    let timer = setTimeout(() => {
                      // Long press action - show advanced options
                      alert(`Advanced options for ${suggestion}:\n• Run as admin\n• Preview output\n• Add to favorites`);
                    }, 500);
                    const clearTimer = () => clearTimeout(timer);
                    document.addEventListener('mouseup', clearTimer, { once: true });
                  }
                }}
                className="bg-green-900 hover:bg-green-700 active:bg-green-800 text-green-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-all border border-green-600 select-none"
                whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(34, 197, 94, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                title={`Click: Execute ${suggestion} | Long-press: Advanced options`}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>

          {isScanning && (
            <div className="mb-4 p-4 bg-gray-800 rounded border border-yellow-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-yellow-400 font-bold">🔍 SECURITY SCAN IN PROGRESS...</span>
                <span className="text-yellow-300">{scanProgress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-yellow-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${scanProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-2 sm:gap-4 mb-4">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="bg-blue-900 hover:bg-blue-700 text-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-colors border border-blue-600"
            >
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
          </div>

          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-4 bg-gray-800 rounded border border-blue-500 max-h-32 overflow-y-auto"
            >
              <h3 className="text-blue-400 font-bold mb-2">Command History:</h3>
              {commandHistory.length > 0 ? (
                commandHistory.map((cmd, index) => (
                  <div key={index} className="text-blue-300 text-sm">
                    {index + 1}. {cmd}
                  </div>
                ))
              ) : (
                <div className="text-blue-500 text-sm">No commands executed yet</div>
              )}
            </motion.div>
          )}

          <div
            ref={terminalRef}
            className="flex-1 bg-gray-900 rounded-lg p-2 sm:p-4 overflow-y-auto max-h-64 sm:max-h-96 mb-4 border border-green-500"
            style={{ minHeight: `${terminalHeight}px` }}
            drag="y"
            dragConstraints={{ top: 150, bottom: 500 }}
            onDragEnd={(event, info) => setTerminalHeight(prev => prev + info.delta.y)}
            dragElastic={0}
          >
            <AnimatePresence>
              {output.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <div className="text-green-300 text-xs mb-1">{item.timestamp}</div>
                  <div className="text-green-400">
                    <span className="text-green-600">$</span> {item.command}
                  </div>
                  <div className="text-green-100 mt-2">
                    {Array.isArray(item.response) ? (
                      item.response.map((line, i) => {
                        const lineStr = String(line || '');
                        return (
                          <div key={i} className={`${
                            lineStr.includes('CRITICAL') || lineStr.includes('🚨') ? 'text-red-400' :
                            lineStr.includes('WARNING') || lineStr.includes('⚠️') ? 'text-yellow-400' :
                            lineStr.includes('HIGH') ? 'text-orange-400' :
                            lineStr.includes('MEDIUM') ? 'text-yellow-300' :
                            lineStr.includes('LOW') ? 'text-green-300' :
                            lineStr.includes('INFO') || lineStr.includes('ℹ️') ? 'text-blue-400' :
                            lineStr.includes('✅') || lineStr.includes('SECURE') ? 'text-green-400' :
                            'text-green-100'
                          }`}>
                            {lineStr}
                          </div>
                        );
                      })
                    ) : (
                      <div className={`${
                        String(item.response || '').includes('CRITICAL') || String(item.response || '').includes('🚨') ? 'text-red-400' :
                        String(item.response || '').includes('WARNING') || String(item.response || '').includes('⚠️') ? 'text-yellow-400' :
                        String(item.response || '').includes('HIGH') ? 'text-orange-400' :
                        String(item.response || '').includes('MEDIUM') ? 'text-yellow-300' :
                        String(item.response || '').includes('LOW') ? 'text-green-300' :
                        String(item.response || '').includes('INFO') || String(item.response || '').includes('ℹ️') ? 'text-blue-400' :
                        String(item.response || '').includes('✅') || String(item.response || '').includes('SECURE') ? 'text-green-400' :
                        'text-green-100'
                      }`}>
                        {item.response}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(
                      Array.isArray(item.response) ? item.response.join('\n') : item.response
                    )}
                    className="text-xs text-green-500 hover:text-green-300 mt-1 opacity-50 hover:opacity-100 transition-opacity"
                    title="Copy to clipboard"
                  >
                    📋 Copy
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex items-center bg-gray-900 p-2 rounded border border-green-600 focus-within:ring-2 focus-within:ring-green-400 focus-within:border-green-400 transition-all">
            <span className="text-green-400 mr-1 sm:mr-2 text-sm">cyberguard@terminal:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 bg-transparent text-green-400 outline-none border-none font-mono placeholder-green-600 text-sm sm:text-base"
              placeholder={showTips ? "Type a command... (Tab for autocomplete, ↑↓ for history)" : "Type a command..."}
              autoFocus
              aria-label="Terminal command input"
              role="textbox"
              aria-live="polite"
            />
            <span className="text-green-400 animate-pulse ml-1 text-sm">█</span>
          </div>

          {showTips && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-xs text-green-500 space-y-1 px-2"
            >
              <div>💡 Tab: autocomplete | ↑↓: history</div>
              <div>💡 Long-press chips for options</div>
            </motion.div>
          )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Terminal;
