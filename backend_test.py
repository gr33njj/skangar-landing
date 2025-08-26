#!/usr/bin/env python3
"""
Backend API Testing for Ангастр Construction Company
Tests all 5 backend endpoints with comprehensive validation
"""

import requests
import json
import time
from datetime import datetime
from typing import Dict, Any, List

# Configuration
BASE_URL = "https://hangar-solutions.preview.emergentagent.com/api"
TIMEOUT = 30

class BackendTester:
    def __init__(self):
        self.results = {
            "contact_form_api": {"status": "pending", "details": []},
            "company_info_api": {"status": "pending", "details": []},
            "services_api": {"status": "pending", "details": []},
            "projects_api": {"status": "pending", "details": []},
            "admin_contact_requests_api": {"status": "pending", "details": []}
        }
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })

    def log_result(self, test_name: str, success: bool, message: str, details: Dict = None):
        """Log test result"""
        result = {
            "timestamp": datetime.now().isoformat(),
            "success": success,
            "message": message,
            "details": details or {}
        }
        self.results[test_name]["details"].append(result)
        print(f"[{'✅' if success else '❌'}] {test_name}: {message}")
        if details:
            print(f"    Details: {json.dumps(details, indent=2, ensure_ascii=False)}")

    def test_contact_form_api(self):
        """Test Contact Form API (POST /api/contact-form) - HIGH PRIORITY"""
        print("\n🔥 Testing Contact Form API (HIGH PRIORITY)")
        
        # Test 1: Valid contact form with all fields
        print("\n📝 Test 1: Valid contact form with all fields")
        valid_data = {
            "name": "Иван Петров",
            "phone": "+7 (918) 633-32-21",
            "email": "ivan.petrov@example.com",
            "buildingType": "Складское здание",
            "area": "1500 м²",
            "message": "Нужен склад для логистической компании"
        }
        
        try:
            response = self.session.post(f"{BASE_URL}/contact-form", json=valid_data, timeout=TIMEOUT)
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("request_id"):
                    self.log_result("contact_form_api", True, "Valid form submission successful", {
                        "status_code": response.status_code,
                        "response": data,
                        "request_id": data.get("request_id")
                    })
                else:
                    self.log_result("contact_form_api", False, "Invalid response format", {
                        "status_code": response.status_code,
                        "response": data
                    })
            else:
                self.log_result("contact_form_api", False, f"HTTP {response.status_code}", {
                    "status_code": response.status_code,
                    "response": response.text
                })
        except Exception as e:
            self.log_result("contact_form_api", False, f"Request failed: {str(e)}")

        # Test 2: Russian phone number variations
        print("\n📞 Test 2: Russian phone number validation")
        phone_variations = [
            "+7 (918) 633-32-21",  # Standard format
            "+79186333221",        # Compact format
            "89186333221",         # Alternative format
            "8 918 633 32 21",     # Spaced format
            "+7-918-633-32-21"     # Dashed format
        ]
        
        for phone in phone_variations:
            test_data = {
                "name": "Тест Телефон",
                "phone": phone,
                "email": "test@example.com"
            }
            
            try:
                response = self.session.post(f"{BASE_URL}/contact-form", json=test_data, timeout=TIMEOUT)
                success = response.status_code == 200 and response.json().get("success", False)
                self.log_result("contact_form_api", success, f"Phone validation: {phone}", {
                    "phone": phone,
                    "status_code": response.status_code,
                    "response": response.json() if response.status_code == 200 else response.text
                })
            except Exception as e:
                self.log_result("contact_form_api", False, f"Phone test failed for {phone}: {str(e)}")

        # Test 3: Email validation
        print("\n📧 Test 3: Email validation")
        email_tests = [
            ("valid@example.com", True),
            ("user.name@domain.co.uk", True),
            ("test+tag@gmail.com", True),
            ("invalid-email", False),
            ("@domain.com", False),
            ("user@", False),
            ("", True)  # Optional field
        ]
        
        for email, should_pass in email_tests:
            test_data = {
                "name": "Тест Email",
                "phone": "+7 (918) 633-32-21",
                "email": email if email else None
            }
            
            try:
                response = self.session.post(f"{BASE_URL}/contact-form", json=test_data, timeout=TIMEOUT)
                success = response.status_code == 200 and response.json().get("success", False)
                expected_result = should_pass
                test_passed = success == expected_result
                
                self.log_result("contact_form_api", test_passed, f"Email validation: {email or 'None'} (expected: {'pass' if should_pass else 'fail'})", {
                    "email": email,
                    "expected": should_pass,
                    "actual": success,
                    "status_code": response.status_code,
                    "response": response.json() if response.status_code == 200 else response.text
                })
            except Exception as e:
                self.log_result("contact_form_api", False, f"Email test failed for {email}: {str(e)}")

        # Test 4: Minimal required fields
        print("\n📋 Test 4: Minimal required fields")
        minimal_data = {
            "name": "Минимальные Данные",
            "phone": "+7 (918) 633-32-21"
        }
        
        try:
            response = self.session.post(f"{BASE_URL}/contact-form", json=minimal_data, timeout=TIMEOUT)
            success = response.status_code == 200 and response.json().get("success", False)
            self.log_result("contact_form_api", success, "Minimal required fields test", {
                "status_code": response.status_code,
                "response": response.json() if response.status_code == 200 else response.text
            })
        except Exception as e:
            self.log_result("contact_form_api", False, f"Minimal fields test failed: {str(e)}")

        # Test 5: Invalid data handling
        print("\n❌ Test 5: Invalid data handling")
        invalid_tests = [
            ({"name": "", "phone": "+7 (918) 633-32-21"}, "Empty name"),
            ({"name": "Test", "phone": "invalid-phone"}, "Invalid phone"),
            ({"name": "Test"}, "Missing phone"),
            ({}, "Empty request")
        ]
        
        for invalid_data, test_desc in invalid_tests:
            try:
                response = self.session.post(f"{BASE_URL}/contact-form", json=invalid_data, timeout=TIMEOUT)
                # Should return 400 or 422 for validation errors
                success = response.status_code in [400, 422]
                self.log_result("contact_form_api", success, f"Invalid data handling: {test_desc}", {
                    "test_data": invalid_data,
                    "status_code": response.status_code,
                    "response": response.text
                })
            except Exception as e:
                self.log_result("contact_form_api", False, f"Invalid data test failed for {test_desc}: {str(e)}")

        # Update overall status
        contact_results = self.results["contact_form_api"]["details"]
        success_count = sum(1 for r in contact_results if r["success"])
        total_count = len(contact_results)
        
        if success_count >= total_count * 0.8:  # 80% success rate
            self.results["contact_form_api"]["status"] = "working"
        else:
            self.results["contact_form_api"]["status"] = "failed"

    def test_company_info_api(self):
        """Test Company Info API (GET /api/company-info) - HIGH PRIORITY"""
        print("\n🏢 Testing Company Info API (HIGH PRIORITY)")
        
        try:
            response = self.session.get(f"{BASE_URL}/company-info", timeout=TIMEOUT)
            
            if response.status_code == 200:
                data = response.json()
                
                # Validate required fields
                required_fields = ["name", "tagline", "description", "address", "working_hours", "phone", "fax", "email"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    # Validate specific values
                    expected_values = {
                        "name": "ООО «Ангастр»",
                        "phone": "+7 (918) 633-32-21",
                        "email": "angastr@inbox.ru"
                    }
                    
                    validation_errors = []
                    for key, expected in expected_values.items():
                        if data.get(key) != expected:
                            validation_errors.append(f"{key}: expected '{expected}', got '{data.get(key)}'")
                    
                    if not validation_errors:
                        self.log_result("company_info_api", True, "Company info retrieved successfully", {
                            "status_code": response.status_code,
                            "response": data
                        })
                        self.results["company_info_api"]["status"] = "working"
                    else:
                        self.log_result("company_info_api", False, f"Data validation failed: {', '.join(validation_errors)}", {
                            "status_code": response.status_code,
                            "response": data,
                            "validation_errors": validation_errors
                        })
                        self.results["company_info_api"]["status"] = "failed"
                else:
                    self.log_result("company_info_api", False, f"Missing required fields: {', '.join(missing_fields)}", {
                        "status_code": response.status_code,
                        "response": data,
                        "missing_fields": missing_fields
                    })
                    self.results["company_info_api"]["status"] = "failed"
            else:
                self.log_result("company_info_api", False, f"HTTP {response.status_code}", {
                    "status_code": response.status_code,
                    "response": response.text
                })
                self.results["company_info_api"]["status"] = "failed"
                
        except Exception as e:
            self.log_result("company_info_api", False, f"Request failed: {str(e)}")
            self.results["company_info_api"]["status"] = "failed"

    def test_services_api(self):
        """Test Services API (GET /api/services) - MEDIUM PRIORITY"""
        print("\n🔧 Testing Services API (MEDIUM PRIORITY)")
        
        try:
            response = self.session.get(f"{BASE_URL}/services", timeout=TIMEOUT)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list) and len(data) > 0:
                    # Validate service structure
                    required_fields = ["id", "category", "items"]
                    validation_errors = []
                    
                    for i, service in enumerate(data):
                        missing_fields = [field for field in required_fields if field not in service]
                        if missing_fields:
                            validation_errors.append(f"Service {i}: missing fields {missing_fields}")
                        
                        if "items" in service and not isinstance(service["items"], list):
                            validation_errors.append(f"Service {i}: items should be a list")
                    
                    # Check for expected categories
                    categories = [service.get("category", "") for service in data]
                    expected_categories = ["Промышленные объекты", "Коммерческие объекты", "Спортивные сооружения", "Сельскохозяйственные объекты", "Специализированные ангары"]
                    
                    if not validation_errors and len(data) >= 5:
                        self.log_result("services_api", True, f"Services retrieved successfully ({len(data)} categories)", {
                            "status_code": response.status_code,
                            "service_count": len(data),
                            "categories": categories
                        })
                        self.results["services_api"]["status"] = "working"
                    else:
                        self.log_result("services_api", False, f"Service validation failed: {', '.join(validation_errors)}", {
                            "status_code": response.status_code,
                            "response": data,
                            "validation_errors": validation_errors
                        })
                        self.results["services_api"]["status"] = "failed"
                else:
                    self.log_result("services_api", False, "Empty or invalid services list", {
                        "status_code": response.status_code,
                        "response": data
                    })
                    self.results["services_api"]["status"] = "failed"
            else:
                self.log_result("services_api", False, f"HTTP {response.status_code}", {
                    "status_code": response.status_code,
                    "response": response.text
                })
                self.results["services_api"]["status"] = "failed"
                
        except Exception as e:
            self.log_result("services_api", False, f"Request failed: {str(e)}")
            self.results["services_api"]["status"] = "failed"

    def test_projects_api(self):
        """Test Projects API (GET /api/projects) - MEDIUM PRIORITY"""
        print("\n🏗️ Testing Projects API (MEDIUM PRIORITY)")
        
        try:
            response = self.session.get(f"{BASE_URL}/projects", timeout=TIMEOUT)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list) and len(data) > 0:
                    # Validate project structure
                    required_fields = ["id", "title", "description", "area", "duration", "type"]
                    validation_errors = []
                    
                    for i, project in enumerate(data):
                        missing_fields = [field for field in required_fields if field not in project]
                        if missing_fields:
                            validation_errors.append(f"Project {i}: missing fields {missing_fields}")
                    
                    if not validation_errors and len(data) >= 3:
                        self.log_result("projects_api", True, f"Projects retrieved successfully ({len(data)} projects)", {
                            "status_code": response.status_code,
                            "project_count": len(data),
                            "projects": [{"title": p.get("title"), "area": p.get("area"), "type": p.get("type")} for p in data]
                        })
                        self.results["projects_api"]["status"] = "working"
                    else:
                        self.log_result("projects_api", False, f"Project validation failed: {', '.join(validation_errors)}", {
                            "status_code": response.status_code,
                            "response": data,
                            "validation_errors": validation_errors
                        })
                        self.results["projects_api"]["status"] = "failed"
                else:
                    self.log_result("projects_api", False, "Empty or invalid projects list", {
                        "status_code": response.status_code,
                        "response": data
                    })
                    self.results["projects_api"]["status"] = "failed"
            else:
                self.log_result("projects_api", False, f"HTTP {response.status_code}", {
                    "status_code": response.status_code,
                    "response": response.text
                })
                self.results["projects_api"]["status"] = "failed"
                
        except Exception as e:
            self.log_result("projects_api", False, f"Request failed: {str(e)}")
            self.results["projects_api"]["status"] = "failed"

    def test_admin_contact_requests_api(self):
        """Test Admin Contact Requests API (GET /api/admin/contact-requests) - LOW PRIORITY"""
        print("\n👨‍💼 Testing Admin Contact Requests API (LOW PRIORITY)")
        
        try:
            response = self.session.get(f"{BASE_URL}/admin/contact-requests", timeout=TIMEOUT)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    # Validate contact request structure if any exist
                    if len(data) > 0:
                        required_fields = ["id", "name", "phone", "status", "created_at"]
                        validation_errors = []
                        
                        for i, request in enumerate(data):
                            missing_fields = [field for field in required_fields if field not in request]
                            if missing_fields:
                                validation_errors.append(f"Request {i}: missing fields {missing_fields}")
                        
                        if not validation_errors:
                            self.log_result("admin_contact_requests_api", True, f"Contact requests retrieved successfully ({len(data)} requests)", {
                                "status_code": response.status_code,
                                "request_count": len(data)
                            })
                            self.results["admin_contact_requests_api"]["status"] = "working"
                        else:
                            self.log_result("admin_contact_requests_api", False, f"Request validation failed: {', '.join(validation_errors)}", {
                                "status_code": response.status_code,
                                "response": data,
                                "validation_errors": validation_errors
                            })
                            self.results["admin_contact_requests_api"]["status"] = "failed"
                    else:
                        # Empty list is valid (no requests yet)
                        self.log_result("admin_contact_requests_api", True, "Contact requests retrieved successfully (empty list)", {
                            "status_code": response.status_code,
                            "request_count": 0
                        })
                        self.results["admin_contact_requests_api"]["status"] = "working"
                else:
                    self.log_result("admin_contact_requests_api", False, "Invalid response format (not a list)", {
                        "status_code": response.status_code,
                        "response": data
                    })
                    self.results["admin_contact_requests_api"]["status"] = "failed"
            else:
                self.log_result("admin_contact_requests_api", False, f"HTTP {response.status_code}", {
                    "status_code": response.status_code,
                    "response": response.text
                })
                self.results["admin_contact_requests_api"]["status"] = "failed"
                
        except Exception as e:
            self.log_result("admin_contact_requests_api", False, f"Request failed: {str(e)}")
            self.results["admin_contact_requests_api"]["status"] = "failed"

    def test_cors_headers(self):
        """Test CORS headers"""
        print("\n🌐 Testing CORS headers")
        
        try:
            # Test preflight request
            response = self.session.options(f"{BASE_URL}/company-info", headers={
                'Origin': 'https://hangar-solutions.preview.emergentagent.com',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-Type'
            }, timeout=TIMEOUT)
            
            cors_headers = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
            }
            
            print(f"CORS Headers: {cors_headers}")
            
        except Exception as e:
            print(f"CORS test failed: {str(e)}")

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Ангастр Backend API Testing")
        print(f"🔗 Base URL: {BASE_URL}")
        print("=" * 60)
        
        # Test in priority order
        self.test_contact_form_api()      # HIGH PRIORITY
        self.test_company_info_api()      # HIGH PRIORITY
        self.test_services_api()          # MEDIUM PRIORITY
        self.test_projects_api()          # MEDIUM PRIORITY
        self.test_admin_contact_requests_api()  # LOW PRIORITY
        self.test_cors_headers()          # Additional test
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        for test_name, result in self.results.items():
            status_emoji = "✅" if result["status"] == "working" else "❌" if result["status"] == "failed" else "⏳"
            test_display_name = test_name.replace("_", " ").title()
            print(f"{status_emoji} {test_display_name}: {result['status'].upper()}")
        
        # Overall status
        working_count = sum(1 for r in self.results.values() if r["status"] == "working")
        total_count = len(self.results)
        
        print(f"\n🎯 Overall: {working_count}/{total_count} APIs working")
        
        if working_count == total_count:
            print("🎉 All backend APIs are working correctly!")
        elif working_count >= total_count * 0.8:
            print("⚠️  Most backend APIs are working, minor issues detected")
        else:
            print("🚨 Critical backend issues detected")
        
        return self.results

if __name__ == "__main__":
    tester = BackendTester()
    results = tester.run_all_tests()