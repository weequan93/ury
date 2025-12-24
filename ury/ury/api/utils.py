import frappe


def ignore_csrf_for_kot_notification():
	"""Allow unauthenticated KOT delay notification without CSRF token."""
	if not frappe.request:
		return
	if frappe.request.path == "/api/method/ury.ury.api.ury_kot_notification.order_delay_notification":
		frappe.conf.ignore_csrf = True
